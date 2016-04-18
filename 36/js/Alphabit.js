'use strict';

var Alphabit = {
  instance: document.getElementById('alphabit'),
  currentPosition: {
    x: 0,
    y: 0
  },
  stepForword: [
    { x:  0, y: -1 }, // North
    { x:  1, y:  0 }, // East
    { x:  0, y:  1 }, // South
    { x: -1, y:  0 }  // West
  ],
  orientationClass: ['facing-north', 'facing-east', 'facing-south', 'facing-west'],
  currentOrientation: 0,
  setPosition(x, y) {
    if(!y) {
      let pos = x;
      if(pos.x && pos.y) {
        x = pos.x;
        y = pos.y;
      }
    }

    Alphabit.instance.style.left = x + 'px';
    Alphabit.instance.style.top = y + 'px';
    Alphabit.currentPosition = {
      x: x,
      y: y
    };
  },
  go() {
    let nextPosition = {
      x: Alphabit.currentPosition.x + Alphabit.stepForword[Alphabit.currentOrientation].x * map.cellSize.x,
      y: Alphabit.currentPosition.y + Alphabit.stepForword[Alphabit.currentOrientation].y * map.cellSize.y
    };
    if(map.isInMap(nextPosition)) { // if next position within this map
      Alphabit.setPosition(nextPosition);
      return true;
    }
    return false;
  },
  turnLeft() {
    Alphabit.currentOrientation = (Alphabit.currentOrientation + 3) % 4;
    Alphabit.instance.className = Alphabit.orientationClass[Alphabit.currentOrientation];
  },
  turnRight() {
    Alphabit.currentOrientation = (Alphabit.currentOrientation + 1) % 4;
    Alphabit.instance.className = Alphabit.orientationClass[Alphabit.currentOrientation];
  },
  turnBack() {
    Alphabit.currentOrientation = (Alphabit.currentOrientation + 2) % 4;      Alphabit.instance.className = Alphabit.orientationClass[Alphabit.currentOrientation];
  },
  transform(step) {
    let nextPosition = {
      x: Alphabit.currentPosition.x + step.x * map.cellSize.x,
      y: Alphabit.currentPosition.y + step.y * map.cellSize.y
    };
    if(map.isInMap(nextPosition)) {
      Alphabit.setPosition(nextPosition);
      return true;
    }
    return false;
  },
  transformLeft() {
    return Alphabit.transform({
      x: -1,
      y: 0
    });
  },
  transformTop() {
    return Alphabit.transform({
      x: 0,
      y: -1
    });
  },
  transformRight() {
    return Alphabit.transform({
      x: 1,
      y: 0
    });
  },
  transformBottom() {
    return Alphabit.transform({
      x: 0,
      y: 1
    });
  },
  faceToLeft() {
    Alphabit.currentOrientation = 3;
    Alphabit.instance.className = Alphabit.orientationClass[Alphabit.currentOrientation];
  },
  faceToTop() {
    Alphabit.currentOrientation = 0;
    Alphabit.instance.className = Alphabit.orientationClass[Alphabit.currentOrientation];
  },
  faceToRight() {
    Alphabit.currentOrientation = 1;
    Alphabit.instance.className = Alphabit.orientationClass[Alphabit.currentOrientation];
  },
  faceToBottom() {
    Alphabit.currentOrientation = 2;
    Alphabit.instance.className = Alphabit.orientationClass[Alphabit.currentOrientation];
  },
  moveLeft() {
    Alphabit.faceToLeft();
    return Alphabit.go();
  },
  moveTop() {
    Alphabit.faceToTop();
    return Alphabit.go();
  },
  moveRight() {
    Alphabit.faceToRight();
    return Alphabit.go();
  },
  moveBottom() {
    Alphabit.faceToBottom();
    return Alphabit.go();
  },
  buildBlock(cb) {
    let pos = {
      x: Alphabit.currentPosition.x + Alphabit.stepForword[Alphabit.currentOrientation].x * map.cellSize.x,
      y: Alphabit.currentPosition.y + Alphabit.stepForword[Alphabit.currentOrientation].y * map.cellSize.y
    };
    let row = Math.floor(pos.y / map.cellSize.y) - 1;
    let col = Math.floor(pos.x / map.cellSize.x) - 1;
    map.setBlock(row, col, cb);
  },
  paintBlock(color, cb) {
    let pos = {
      x: Alphabit.currentPosition.x + Alphabit.stepForword[Alphabit.currentOrientation].x * map.cellSize.x,
      y: Alphabit.currentPosition.y + Alphabit.stepForword[Alphabit.currentOrientation].y * map.cellSize.y
    };
    let row = Math.floor(pos.y / map.cellSize.y) - 1;
    let col = Math.floor(pos.x / map.cellSize.x) - 1;
    map.setBlockColor(row, col, color, cb);
  },
  findPath(row, col, cb) {
    if(map.data[row] && map.data[row][col] === 1) cb && cb({message: 'can not walk into block'});
    let pathTree = [];
    let queue = [];
    let res = [];
    let desRow = Math.floor(Alphabit.currentPosition.y / map.cellSize.y) - 1;
    let desCol = Math.floor(Alphabit.currentPosition.x / map.cellSize.x) - 1;

    pathTree[row] = [];
    pathTree[row][col] = -1;
    queue.push({
      row: row,
      col: col,
      dir: -1
    });

    while(queue.length) {
      var cur = queue.shift();
      if(cur.row === desRow && cur.col === desCol) { // arrived destination
        while(true) {
          res.push(cur.dir);
          if(~cur.dir) {
            cur = {
              row: cur.row - Alphabit.stepForword[cur.dir].y,
              col: cur.col - Alphabit.stepForword[cur.dir].x,
            };
            cur.dir = pathTree[cur.row][cur.col];
          } else {
            break;
          }
        }
        break;
      }

      for(let i = 0; i < 4; i++) {
        let next = {
          row: cur.row + Alphabit.stepForword[i].y,
          col: cur.col + Alphabit.stepForword[i].x,
          dir: i
        };
        if(next.row >= 0 && next.row < map.row && next.col >= 0 && next.col < map.col) { // next postion is inside map
          if(pathTree[next.row] && pathTree[next.row][next.col] !== undefined) continue;

          if(!pathTree[next.row]) pathTree[next.row] = [];
          pathTree[next.row][next.col] = next.dir;
          queue.push(next);
        }
      }
    }

    if(res.length) {
      cb && cb(null, res);      
    } else {
      cb && cb({message: 'unreachable'});
    }
  }
}
