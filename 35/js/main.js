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

function submitCommand(command, cb) {
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
  (function run(lineIndex) {
    if(lineIndex >= lines.length) {
      return;
    }
    let line = lines[lineIndex];
    line = line.replace(/</g, "$lt;").replace(/>/g, "$gt;"); // avoid script injection attack
    let command = line.split(/\s+/).join(" "); // remove duplicate space
    if(command) {
      submitCommand(command, function(err) {
        if(err) {
          editor.lineNumbers.children[lineIndex].classList.add('warning');
        } else {
          editor.lineNumbers.children[lineIndex].classList.remove('warning');
        }
      })
    }
    window.setTimeout(function() {
      run(lineIndex + 1);
    }, 750);
  })(0);
});
