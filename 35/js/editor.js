'use strict';

var Editor = function(editorInfo) {
  this.textarea = null;
  this.lineNumbers = null;
  this.minWidth = 0;
  this.minHeight = 0;
  this.fontSize = 14;
  this.lineHeight = 20;
  this.lineCount = 0;

  if(!editorInfo) {
    throw new Error('No EditorInfo Provided');
  }

  for(var x in editorInfo) {
    if(this.hasOwnProperty(x)) {
      this[x] = editorInfo[x];
    }
  }

  if(!this.textarea) {
    throw new Error('no textarea provided');
  }

  if(!this.lineNumbers) {
    throw new Error('no lineNumbers provided');
  }

  this.textarea.addEventListener('input', () => {
    this.textarea.style.height = this.minHeight + 'px'; // reset the height of editor
    var height = this.textarea.scrollHeight;
    if(height < this.minHeight) {
      height = this.minHeight;
    }
    this.textarea.style.height = height + 'px';
    this.lines = this.textarea.value.split(/\r*\n/);
    while(this.lineCount != this.lines.length) {
      if(this.lineCount < this.lines.length) {
        this.lineCount += 1;
        var numbersNode = document.createElement('span');
        numbersNode.innerHTML = this.lineCount;
        this.lineNumbers.appendChild(numbersNode);
      } else {
        this.lineCount -= 1;
        this.lineNumbers.removeChild(this.lineNumbers.lastElementChild);
      }
    }
  });

  this.textarea.value = "";
  this.lineCount = 1;
  var numbersNode = document.createElement('span');
  numbersNode.innerHTML = '1';
  this.lineNumbers.appendChild(numbersNode);
};

Editor.prototype.getLines = function() {
  return this.lines;
}

Editor.prototype.reset = function() {
  this.textarea.value = "";
  this.lineCount = 1;
  var numbersNode = document.createElement('span');
  numbersNode.innerHTML = '1';
  this.lineNumbers.innerHTML = '';
  this.lineNumbers.appendChild(numbersNode);
  this.lines = [''];
}
