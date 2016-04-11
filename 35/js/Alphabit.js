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
      x: AlphaBit.currentPosition.x + AlphaBit.stepForword[AlphaBit.currentOrientation].x * map.cellSize.x,
      y: AlphaBit.currentPosition.y + AlphaBit.stepForword[AlphaBit.currentOrientation].y * map.cellSize.y
    };
    if(map.isInMap(nextPosition)) { // if next position within this map
      AlphaBit.setPosition(nextPosition);
      return true;
    }
    return false;
  },
  turnLeft() {
    AlphaBit.currentOrientation = (AlphaBit.currentOrientation + 3) % 4;
    AlphaBit.instance.className = AlphaBit.orientationClass[AlphaBit.currentOrientation];
  },
  turnRight() {
    AlphaBit.currentOrientation = (AlphaBit.currentOrientation + 1) % 4;
    AlphaBit.instance.className = AlphaBit.orientationClass[AlphaBit.currentOrientation];
  },
  turnBack() {
    AlphaBit.currentOrientation = (AlphaBit.currentOrientation + 2) % 4;      AlphaBit.instance.className = AlphaBit.orientationClass[AlphaBit.currentOrientation];
  },
  transform(step) {
    let nextPosition = {
      x: AlphaBit.currentPosition.x + step.x * map.cellSize.x,
      y: AlphaBit.currentPosition.y + step.y * map.cellSize.y
    };
    if(map.isInMap(nextPosition)) {
      AlphaBit.setPosition(nextPosition);
      return true;
    }
    return false;
  },
  transformLeft() {
    return AlphaBit.transform({
      x: -1,
      y: 0
    });
  },
  transformTop() {
    return AlphaBit.transform({
      x: 0,
      y: -1
    });
  },
  transformRight() {
    return AlphaBit.transform({
      x: 1,
      y: 0
    });
  },
  transformBottom() {
    return AlphaBit.transform({
      x: 0,
      y: 1
    });
  },
  faceToLeft() {
    AlphaBit.currentOrientation = 3;
    AlphaBit.instance.className = AlphaBit.orientationClass[AlphaBit.currentOrientation];
  },
  faceToTop() {
    AlphaBit.currentOrientation = 0;
    AlphaBit.instance.className = AlphaBit.orientationClass[AlphaBit.currentOrientation];
  },
  faceToRight() {
    AlphaBit.currentOrientation = 1;
    AlphaBit.instance.className = AlphaBit.orientationClass[AlphaBit.currentOrientation];
  },
  faceToBottom() {
    AlphaBit.currentOrientation = 2;
    AlphaBit.instance.className = AlphaBit.orientationClass[AlphaBit.currentOrientation];
  },
  moveLeft() {
    AlphaBit.faceToLeft();
    return AlphaBit.go();
  },
  moveTop() {
    AlphaBit.faceToTop();
    return AlphaBit.go();
  },
  moveRight() {
    AlphaBit.faceToRight();
    return AlphaBit.go();
  },
  moveBottom() {
    AlphaBit.faceToBottom();
    return AlphaBit.go();
  }

}
