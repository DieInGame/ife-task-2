'use strict';

var Editor = function(editorInfo) {
  this.textarea = null;
  this.minWidth = 0;
  this.minHeight = 0;
  this.fontSize = 14;
  this.lineHeight = 20;

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

  this.textarea.addEventListener('input', () => {
    this.textarea.style.height = this.minHeight; // reset the height of editor
    var height = this.textarea.scrollHeight;
    if(height < this.minHeight) {
      height = this.minHeight;
    }
    this.textarea.style.height = height + 'px';
    console.log(height);
  });
};
