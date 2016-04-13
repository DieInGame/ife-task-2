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
/*
function submitCommand(command, cb) {
  for(let i = 0, len = CommandList.length; i < len; i++) {
    if(CommandList[i].test(command)) {
      CommandList[i].action();
      cb && cb();
      return;
    }
  }
  cb && cb({ message: 'command not found'});
}
*/
function submitCommand(command, cb) {

    var number=command.toString().charAt(command.length-1);
    if (!isNaN(number)) {//最后一位是数字
        var com =command.substring(0,command.length-1).trim();

        for(let i = 0, len = CommandList.length; i < len; i++) {
            for(let j=0;j<number;j++){
                if(CommandList[i].test(com)) {
                    CommandList[i].action();
                    cb && cb();
                }
            }
            return;
        }
        cb && cb({ message: 'command not found'});
    }
    else{//最后一位不是数字

        for(let i = 0, len = CommandList.length; i < len; i++) {
                if(CommandList[i].test(command)) {
                    CommandList[i].action();
                    cb && cb();
                }
            return;
        }
        cb && cb({ message: 'command not found'});

    }
}

document.querySelector('.toolbar .run').addEventListener('click', function() {
  var lines = editor.getLines();
  (function run(lineIndex) {
    if(lineIndex >= lines.length) {
      return;
    }
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
