'use strict';

var CommandList = [
  {
    test: (command) => /GO( \d*)?/.test(command.toUpperCase()),
    action: (command, cb) => {
      let count = command.toUpperCase().match(/GO( \d*)?/)[1] || 1;
      (function run(count) {
        if(count <= 0) {
          cb && cb();
          return;
        }
        var group =  Alphabit.go() ? Output.log("go forward one step") : Output.error("AlphaBit hits the wall and cry like a baby :(");
        window.setTimeout(() => run(count - 1), 750);
      })(count);
    }
  },
  {
    test: (command) => command.toUpperCase() === "TUN LEF",
    action: (command, cb) => { Alphabit.turnLeft(); Output.log("turn left"); window.setTimeout(cb, 750);}
  },
  {
    test: (command) => command.toUpperCase() === "TUN RIG",
    action: (command, cb) => { Alphabit.turnRight(); Output.log("turn right"); window.setTimeout(cb, 750);}
  },
  {
    test: (command) => command.toUpperCase() === "TUN BAC",
    action: (command, cb) => { Alphabit.turnBack(); Output.log("turn back"); window.setTimeout(cb, 750);}
  },
  {
    test: (command) => /TRA (LEF|TOP|RIG|BOT)( \d*)?/.test(command.toUpperCase()),
    action: (command, cb) => {
      let matchGroup = command.toUpperCase().match(/TRA (LEF|TOP|RIG|BOT)( \d*)?/);
      let direction = matchGroup[1];
      let count = matchGroup[2] || 1;
      let fn = ({
        'LEF': Alphabit.transformLeft,
        'TOP': Alphabit.transformBottom,
        'RIG': Alphabit.transformRight,
        'BOT': Alphabit.transformBottom
      })[direction];
      (function run(count) {
        if(count <= 0) {
          cb && cb();
          return;
        }
        if(fn()) {
          Output.log('transform success');
        } else {
          Output.error('Stoping transfrom');
          count = 0;
        }
        window.setTimeout(() => run(count - 1), 750);
      })(count);
    }
  },
  {
    test: (command) => /MOV (LEF|TOP|RIG|BOT)( \d*)?/.test(command.toUpperCase()),
    action: (command, cb) => {
      let matchGroup = command.toUpperCase().match(/MOV (LEF|TOP|RIG|BOT)( \d*)?/);
      let direction = matchGroup[1];
      let count = matchGroup[2] || 1;
      let fn = ({
        'LEF': Alphabit.moveLeft,
        'TOP': Alphabit.moveTop,
        'RIG': Alphabit.moveRight,
        'BOT': Alphabit.moveBottom
      })[direction];
      (function run(count) {
        if(count <= 0) {
          cb && cb();
          return;
        }
        if(fn()) {
          Output.log('move success');
        } else {
          Output.error('Stoping moving');
          count = 0;
        }
        window.setTimeout(() => run(count - 1), 750);
      })(count);
    }
  },
  {
    test: (command) => command.toUpperCase() === 'BUILD',
    action: (command, cb) => {
      Alphabit.buildBlock((err) => {
        if(err) {
          console.log('error: ', err.message);
        }
        window.setTimeout(cb, 750);
      });
    }
  },
  {
    test: (command) => /BRU #[A-Fa-f0-9]{6}/.test(command.toUpperCase()),
    action: (command, cb) => {
      let hexColorCode = command.toUpperCase().match(/BRU (#[A-Fa-f0-9]{6})/)[1];
      Alphabit.paintBlock(hexColorCode, (err) => {
        if(err) {
          console.log('error: ', err.message);
        }
        window.setTimeout(cb, 750);
      });
    }
  },
  {
    test: (command) => /TOOO* YOUNG/.test(command.toUpperCase()),
    action: (command, cb) => {
      map.reset(); // clear map
      let inRow = Math.floor(Alphabit.currentPosition.y / map.cellSize.y) - 1;
      let inCol = Math.floor(Alphabit.currentPosition.x / map.cellSize.x) - 1;
      let posCnt = command.toUpperCase().match(/TOO(O*) YOUNG/)[1].length * 2 + 5; // how many position should generate
      if(posCnt >= (map.row * map.col)) posCnt = map.row * map.col - 1;
      let randomPosLst = ((lstLength) => {
        let lst = [];
        for(let i = 0; i < lstLength; i++) lst.push(i);
        for(let i = lstLength - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [lst[i], lst[j]] = [lst[j], lst[i]];
        }
        return lst;
      })(map.row * map.col);
      randomPosLst.splice(randomPosLst.indexOf(inRow * inCol), 1); // remove position Alphlbit on
      randomPosLst = randomPosLst.slice(0, posCnt);
      randomPosLst.forEach((num) => {
        let row = Math.floor(num / map.col);
        let col = num % map.col;
        map.setBlock(row, col);
      });
      window.setTimeout(cb, 750);
    }
  },
  {
    test: (command) => /MOV TO 0[A-F0-9]\s*,\s*0[A-F0-9]/.test(command.toUpperCase()),
    action: (command, cb) => {
       let group = command.toUpperCase().match(/MOV TO (0[A-F0-9])\s*,\s*(0[A-F0-9])/);
       let row = parseInt(group[1], 16);
       let col = parseInt(group[2], 16);
       if(row >= 0 && row < map.row && col >= 0 && col < map.col) {
         Alphabit.findPath(row, col, (err, res) => {
           if(err) {
             console.log('error: ', err.message);
             return;
           }
           (function run() {
             let dir = res.shift();
             if(!(~dir)) {
               cb && cb();
               return;
             }
             [Alphabit.moveBottom, Alphabit.moveLeft, Alphabit.moveTop, Alphabit.moveRight][dir]();
             window.setTimeout(run, 750);
           })();
         });
       }
    }
  }
];
