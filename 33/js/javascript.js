(function() {
  "use strict";
  var rowCells = document.querySelectorAll("tr:first-child td");
  var colCells = document.querySelectorAll("tr td:first-child");
  for(let i = 1, len = rowCells.length; i < len; i++) {
    colCells[i].innerHTML = rowCells[i].innerHTML = (i-1).toString(16);
  }
})();