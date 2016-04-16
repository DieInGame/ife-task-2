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
  }

}
