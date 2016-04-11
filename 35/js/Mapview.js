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

var rowCells = document.querySelectorAll("tr:first-child td");
var colCells = document.querySelectorAll("tr td:first-child");
for(let i = 1, len = rowCells.length; i < len; i++) {
  colCells[i].innerHTML = rowCells[i].innerHTML = "0" + (i-1).toString(16);
}
