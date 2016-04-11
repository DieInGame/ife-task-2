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

function submitcommand(command, cb) {
  for(let i = 0, len = CommandList.length; i < len; i++) {
    if(CommandList[i].test(command)) {
      CommandList[i].action();
      cb && cb();
    }
  }
  cb && cb({ message: 'command not found'});
}

document.querySelector('.toolbar .run').addEventListener('click', function() {
  var lines = editor.getLines();
  for(let i = 0, len = lines.length; i < len; i++) {
    let line = lines[i];
    line = line.replace(/</g, "$lt;").replace(/>/g, "$gt;"); // avoid script injection attack
    let command = line.split(/\s+/).join(" "); // remove duplicate space
    if(command) {
      console.log(command);
      submitcommand(command, function(err) {
        if(err) {
          editor.lineNumbers.children[i].classList.add('warning');
        } else {
          editor.lineNumbers.children[i].classList.remove('warning');
        }
      });
    }
  }
});
