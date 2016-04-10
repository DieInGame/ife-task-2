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

  this.textarea.addEventListener('input', function() {
    this.style.height = this.scrollHeight + 'px';
  });
};
