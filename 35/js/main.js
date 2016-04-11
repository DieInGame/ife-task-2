'use strict';

Alphabit.setPosition(map.origin.x, map.origin.y);
Alphabit.currentOrientation = 1;
Alphabit.instance.className = 'facing-east';

var editor = new Editor({
  textarea: document.getElementsByTagName('textarea')[0],
  lineNumbers: document.getElementsByClassName('line-nums')[0],
  minWidth: 550,
  minHeight: 620
});

function submitcommand(line) {
  rawString = rawString.replace(/</g, "$lt;").replace(/>/g, "$gt;"); // avoid script injection attack
  var command = rawString.split(/\s+/).join(" "); // remove duplicate space
  for(let i = 0, len = CommandList.length; i < len; i++) {
    if(CommandList[i].test(command)) {
      CommandList[i].action();
      return true;
    }
  }
  return false;
}
