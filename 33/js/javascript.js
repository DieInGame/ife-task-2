(function() {
  "use strict";
  
  var map = {
    row: 16,
    col: 16,
    origin: {
      x: 45,
      y: 45
    },
    cellSize: {
      x: 30,
      y: 30
    }
  };
  
  map.size = {
    x: map.origin.x + map.row * map.cellSize.x,
    y: map.origin.y + map.col * map.cellSize.y
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
    orientationClass: ['facing-north', 'facing-east', 'facing-south', 'facing-west'],
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
        x: AlphaBit.currentPosition.x + AlphaBit.stepForword[AlphaBit.currentOrientation].x * map.cellSize.x,
        y: AlphaBit.currentPosition.y + AlphaBit.stepForword[AlphaBit.currentOrientation].y * map.cellSize.y
      };
      if(nextPosition.x < map.size.x && nextPosition.x >= map.origin.x && nextPosition.y < map.size.y && nextPosition.y >= map.origin.y) { // if next position within this map
        AlphaBit.instance.style.left = nextPosition.x + "px";
        AlphaBit.instance.style.top = nextPosition.y + "px";
        AlphaBit.currentPosition = nextPosition;
      }
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
    }
  };
  
  var Output = {
    log(message) {
      var logElement = document.createElement("p");
      logElement.className = "output-log";
      logElement.innerHTML = "> " + message;
      
      var outputArea = document.getElementsByClassName("command-output-area")[0];
      if(outputArea.childElementCount > 5) outputArea.removeChild(outputArea.firstElementChild);
      outputArea.appendChild(logElement);
    },
    error(message) {
      var errorElement = document.createElement("p");
      errorElement.className = "output-error";
      errorElement.innerHTML = "[ERROR] " + message;
      
      var outputArea = document.getElementsByClassName("command-output-area")[0];
      if(outputArea.childElementCount > 5) outputArea.removeChild(outputArea.firstElementChild);
      outputArea.appendChild(errorElement);
    }
  };
  
  var CommandList = [
    {
      test: (command) => command.toUpperCase() === "GO",
      action: () => { AlphaBit.go(); Output.log("go forward one step"); }
    },
    {
      test: (command) => command.toUpperCase() === "TUN LEF",
      action: () => { AlphaBit.turnLeft(); Output.log("turn left"); }
    },
    {
      test: (command) => command.toUpperCase() === "TUN RIG",
      action: () => { AlphaBit.turnRight(); Output.log("turn right"); }
    },
    {
      test: (command) => command.toUpperCase() === "TUN BAC",
      action: () => { AlphaBit.turnBack(); Output.log("turn back"); }
    }
  ];
  
  var rowCells = document.querySelectorAll("tr:first-child td");
  var colCells = document.querySelectorAll("tr td:first-child");
  for(let i = 1, len = rowCells.length; i < len; i++) {
    colCells[i].innerHTML = rowCells[i].innerHTML = (i-1).toString(16);
  }
  
  function submitCommand(rawString) {
    if(rawString.length > 32) {
      Output.error("command tooooooooooooooo long");
    }
    rawString = rawString.replace(/</g, "$lt;").replace(/>/g, "$gt;"); // avoid script injection attack
    var command = rawString.split(/\s+/).join(" "); // remove duplicate space
    var meetCommand = false;
    for(let i = 0, len = CommandList.length; i < len; i++) {
      if(CommandList[i].test(command)) {
        CommandList[i].action();
        meetCommand = true;
      }
    }
    if(!meetCommand) {
      Output.error("no such a command");
    }
  }
  
  document.getElementsByClassName("command-input")[0].onkeypress = function(e) {
    var keycode = e.keycode || e.which;
    if(keycode === 13) { // if Enter key pressed
      submitCommand(this.value);
      this.value = ""; // clear input field
    }
  };
  
  AlphaBit.setPosition(map.origin.x, map.origin.y);
  AlphaBit.currentOrientation = 1;
  AlphaBit.instance.className = "facing-east";
})();