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
    }
  };
  
  map.size = {
    x: map.row * map.cellSize.x,
    y: map.col * map.cellSize.y
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
      if(nextPosition.x < map.size.x && nextPosition.x >= map.origin.x && nextPosition.y < map.size.y && nextPosition.y >= map.origin.y) { // if next position within this map
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
  
  var CommandList = [
    {
      test: (command) => command.toUppercase === "GO",
      action: () => AlphaBit.go()
    },
    {
      test: (command) => command.toUppercase === "TUN LEF",
      action: () => AlphaBit.turnLeft()
    },
    {
      test: (command) => command.toUppercase === "TUN RIG",
      action: () => AlphaBit.turnRight()
    },
    {
      test: (command) => command.toUppercase === "TUN BAC",
      action: () => AlphaBit.turnBack()
    }
  ];
  
  var rowCells = document.querySelectorAll("tr:first-child td");
  var colCells = document.querySelectorAll("tr td:first-child");
  for(let i = 1, len = rowCells.length; i < len; i++) {
    colCells[i].innerHTML = rowCells[i].innerHTML = (i-1).toString(16);
  }
  
  function submitCommand(rawString) {
    if(rawString.length > 32) {
      // TODO: error command too long
    }
    rawString = rawString.replace(/</g, "$lt;").replace(/>/g, "$gt;"); // avoid script injection attack
    var command = rawString.split(/\s+/).join(" "); // remove duplicate space
    for(let i = 0, len = CommandList.length; i < len; i++) {
      if(CommandList[i].test(command)) {
        CommandList[i].action();
      }
    }
  }
  
  document.getElementsByClassName("command-input")[0].onkeypress = function(e) {
    var keycode = e.keycode || e.which;
    if(keycode === 13) { // if Enter key pressed
      submitCommand(this.value);
      this.value = ""; // clear input field
    }
  };
})();