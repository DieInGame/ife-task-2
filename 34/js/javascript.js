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
  
  map.isInMap = function(pos) {
    return (pos.x < map.size.x && pos.x >= map.origin.x && pos.y < map.size.y && pos.y >= map.origin.y);
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
      if(!y) {
        let pos = x;
        if(pos.x && pos.y) {
          x = pos.x;
          y = pos.y;
        }
      }
      
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
      action: () => { AlphaBit.go() ? Output.log("go forward one step") : Output.error("AlphaBit hits the wall and cry like a baby :("); }
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
    },
    {
      test: (command) => command.toUpperCase() === "TRA LEF",
      action: () => { AlphaBit.transformLeft() ? Output.log("transform to left") : Output.error("WTF??? Left??? Are you blind?"); }
    },
    {
      test: (command) => command.toUpperCase() === "TRA TOP",
      action: () => { AlphaBit.transformTop() ? Output.log("transform to top") : Output.error("WTF??? Top??? Are you blind?"); }
    },
    {
      test: (command) => command.toUpperCase() === "TRA RIG",
      action: () => { AlphaBit.transformRight() ? Output.log("transform to right") : Output.error("WTF??? Right??? Are you blind?"); }
    },
    {
      test: (command) => command.toUpperCase() === "TRA BOT",
      action: () => { AlphaBit.transformBottom() ? Output.log("transform to bottom") : Output.error("WTF??? Bottom??? Are you blind?"); }
    },
    {
      test: (command) => command.toUpperCase() === "MOV LEF",
      action: () => { AlphaBit.moveLeft() ? Output.log("move to left") : Output.error("I'm facing left now and there is a wall in front of me."); }
    },
    {
      test: (command) => command.toUpperCase() === "MOV TOP",
      action: () => { AlphaBit.moveTop() ? Output.log("move to top") : Output.error("I'm facing top now and there is a wall in front of me."); }
    },
    {
      test: (command) => command.toUpperCase() === "MOV RIG",
      action: () => { AlphaBit.moveRight() ? Output.log("move to right") : Output.error("I'm facing right now and there is a wall in front of me."); }
    }
  ];
  
  var rowCells = document.querySelectorAll("tr:first-child td");
  var colCells = document.querySelectorAll("tr td:first-child");
  for(let i = 1, len = rowCells.length; i < len; i++) {
    colCells[i].innerHTML = rowCells[i].innerHTML = "0" + (i-1).toString(16);
  }
  
  function submitCommand(rawString) {
    if(rawString.length > 32) {
      Output.error("command tooooooooooooooo long");
      return;
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
      Output.error('AlphaBit just don\'t know what "' + command.toUpperCase() + '" means :-/');
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
  
  document.getElementsByClassName("command-input")[0].focus();
})();