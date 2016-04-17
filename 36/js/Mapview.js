"use strict";

var map = {
  htmlElement: document.querySelector('.map tbody'),
  row: 16,
  col: 16,
  origin: {
    x: 45,
    y: 45
  },
  cellSize: {
    x: 30,
    y: 30
  },
  data: []
};

map.size = {
  x: map.origin.x + map.row * map.cellSize.x,
  y: map.origin.y + map.col * map.cellSize.y
};

map.isInMap = function(pos) {
  return (pos.x < map.size.x && pos.x >= map.origin.x && pos.y < map.size.y && pos.y >= map.origin.y);
};

map.setBlock = function(row, col, cb) {
  if(row < this.row && col < this.col) {
    if(this.data[row] && this.data[row][col]) {
      cb && cb({message: 'not empty'});
    } else {
      if(!this.data[row]) this.data[row] = [];
      this.data[row][col] = 1;
      this.htmlElement.children[row + 1].children[col + 1].className = 'block';
      cb && cb();
    }
  } else {
    cb && cb({message: 'Out of range'});
  }
}

map.clearBlock = function(row, col) {
  if(row < this.row && col < this.col) {
    if(!this.data[row]) this.data[row] = [];
    this.data[row][col] = 0;
    let cell = this.htmlElement.children[row + 1].children[col + 1];
    cell.className = '';
    cell.removeAttribute('style');
  }
}

map.setBlockColor = function(row, col, color, cb) {
  if(row < this.row && col < this.col) {
    if(this.data[row] && this.data[row][col]) {
      let cell = this.htmlElement.children[row + 1].children[col + 1];
      cell.style.background = color;
      cb && cb();
    } else {
      cb && cb({message: 'no block to paint'});
    }
  } else {
     cb && cb({message: 'Out of range'});
  }
}

map.reset = function() {
   for(let i = 0; i < this.row; i++) for(let j = 0; j < this.col; j++) map.clearBlock(i, j);
}

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
