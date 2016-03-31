(function() {
  "use strict";
  
  var map = {
    row: 16,
    col: 16,
    origin: {
      x: 15,
      y: 15
    },
    cellSize: {
      x: 30,
      y: 30
    },
    size: {
      x: row * map.cellSize.x,
      y: col * map.cellSize.y
    }
  };
  
  var AlphaBit = {
    instance: document.getElementById("alphabit"),
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
    currentOrientation: 0,
    setPosition(x, y) {
      AlphaBit.instance.style.left = x + "px";
      AlphaBit.instance.style.top = y + "px";
      AlphaBit.currentPosition = {
        x: x,
        y: y
      };
    },
    go() {
      let nextPosition = {
        x: AlphaBit.currentPosition.x + AlphaBit.stepForword[AlphaBit.currentOrientation] * map.cellSize.x,
        y: AlphaBit.currentPosition.x + AlphaBit.stepForword[AlphaBit.currentOrientation] * map.cellSize.y
      };
      if(nextPosition.x < map.size.x && nextPosition.y < map.size.y) {
        AlphaBit.currentPosition = nextPosition;
      }
    },
    turnLeft() {
      AlphaBit.currentOrientation = (AlphaBit.currentOrientation + 3) % 4;
    },
    turnRight() {
      AlphaBit.currentOrientation = (AlphaBit.currentOrientation + 1) % 4;
    },
    turnBack() {
      AlphaBit.currentOrientation = (AlphaBit.currentOrientation + 2) % 4;
    }
  };
  
  var rowCells = document.querySelectorAll("tr:first-child td");
  var colCells = document.querySelectorAll("tr td:first-child");
  for(let i = 1, len = rowCells.length; i < len; i++) {
    colCells[i].innerHTML = rowCells[i].innerHTML = (i-1).toString(16);
  }
})();