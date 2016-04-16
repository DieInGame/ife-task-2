'use strict';

Alphabit.setPosition(map.origin.x, map.origin.y);
Alphabit.currentOrientation = 1;
Alphabit.instance.className = 'facing-east';

var editor = new Editor({
  textarea: document.getElementsByTagName('textarea')[0],
  lineNumbers: document.getElementsByClassName('line-nums')[0],
  minWidth: 550,
  minHeight: 220
});

function submitCommand(command, cb) {
  for(let i = 0, len = CommandList.length; i < len; i++) {
    if(CommandList[i].test(command)) {
      CommandList[i].action(command);
      cb && cb();
      return;
    }
  }
  cb && cb({ message: 'command not found'});
}

document.querySelector('.toolbar .run').addEventListener('click', function() {
  var lines = editor.getLines();
  var viewport = document.getElementsByClassName('board')[0];
  (function run(lineIndex) {
    if(lineIndex >= lines.length) {
      return;
    }
    viewport.scrollTop = lineIndex * 20 - editor.minHeight / 2;
    let lineNumberElement = editor.lineNumbers.children[lineIndex];
    lineNumberElement.className = 'running';
    let line = lines[lineIndex];
    line = line.replace(/</g, "$lt;").replace(/>/g, "$gt;"); // avoid script injection attack
    let command = line.split(/\s+/).join(" "); // remove duplicate space
    if(command) {
      submitCommand(command, function(err) {
        if(err) {
          lineNumberElement.className = 'warning';
          Output.error(err.message + ' at line ' + (lineIndex+1));
        } else {
          window.setTimeout(function() {
            lineNumberElement.className = '';
            run(lineIndex + 1);
          }, 750);
        }
      })
    }
  })(0);
});

document.querySelector('.toolbar .reset').addEventListener('click', function() {
  editor.reset();
});
