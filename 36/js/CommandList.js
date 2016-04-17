'use strict';

var CommandList = [
  {
    test: (command) => /GO( \d*)?/.test(command.toUpperCase()),
    action: (command) => {
      let count = command.toUpperCase().match(/GO( \d*)?/)[1] || 1;
      for(let i = 0; i < count; i++) {
        var group =  Alphabit.go() ? Output.log("go forward one step") : Output.error("AlphaBit hits the wall and cry like a baby :("); }
      }
  },
  {
    test: (command) => command.toUpperCase() === "TUN LEF",
    action: () => { Alphabit.turnLeft(); Output.log("turn left"); }
  },
  {
    test: (command) => command.toUpperCase() === "TUN RIG",
    action: () => { Alphabit.turnRight(); Output.log("turn right"); }
  },
  {
    test: (command) => command.toUpperCase() === "TUN BAC",
    action: () => { Alphabit.turnBack(); Output.log("turn back"); }
  },
  {
    test: (command) => /TRA (LEF|TOP|RIG|BOT)( \d*)?/.test(command.toUpperCase()),
    action: (command) => {
      let matchGroup = command.toUpperCase().match(/TRA (LEF|TOP|RIG|BOT)( \d*)?/);
      let direction = matchGroup[1];
      let count = matchGroup[2] || 1;
      let fn = ({
        'LEF': Alphabit.transformLeft,
        'TOP': Alphabit.transformBottom,
        'RIG': Alphabit.transformRight,
        'BOT': Alphabit.transformBottom
      })[direction];
      for(let i = 0; i < count; i++) {
        if(fn()) {
          Output.log('transform success');
        } else {
          Output.error('Stoping transfrom');
          break;
        }
      }
    }
  },
  {
    test: (command) => /MOV (LEF|TOP|RIG|BOT)( \d*)?/.test(command.toUpperCase()),
    action: (command) => {
      let matchGroup = command.toUpperCase().match(/MOV (LEF|TOP|RIG|BOT)( \d*)?/);
      let direction = matchGroup[1];
      let count = matchGroup[2] || 1;
      let fn = ({
        'LEF': Alphabit.moveLeft,
        'TOP': Alphabit.moveTop,
        'RIG': Alphabit.moveRight,
        'BOT': Alphabit.moveBottom
      })[direction];
      for(let i = 0; i < count; i++) {
        if(fn()) {
          Output.log('move success');
        } else {
          Output.error('Stoping moving');
          break;
        }
      }
    }
  },
  {
    test: (command) => command.toUpperCase() === 'BUILD',
    action: (command) => {
      Alphabit.buildBlock((err) => {
        if(err) {
          console.log('error: ', err.message);
        }
      });
    }
  },
  {
    test: (command) => /BRU #[A-Fa-f0-9]{6}/.test(command.toUpperCase()),
    action: (command) => {
      let hexColorCode = command.toUpperCase().match(/BRU (#[A-Fa-f0-9]{6})/)[1];
      console.log(hexColorCode);
      Alphabit.paintBlock(hexColorCode, (err) => {
        if(err) {
          console.log('error: ', err.message);
        }
      });
    }
  }
];
