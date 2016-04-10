var editor = function(editorInfo) {
  this.editor = null;
  this.minWidth = 0;
  this.minHeight = 0;
  this.fontSize = 14;
  this.lineHeight = 20;

  if(!editorInfo) {
    throw new Error('No EditorInfo Provided');
  }

  for(var x in editor) {
    if(this.hasOwnProperty(x)) {
      this[x] = editor[x];
    }
  }

  if(!this.editor) {
    throw new Error('no editor provided');
  }
};
