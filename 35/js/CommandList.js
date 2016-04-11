'use strict';

var CommandList = [
  {
    test: (command) => command.toUpperCase() === "GO",
    action: () => { AlphaBit.go() ? Output.log("go forward one step") : Output.error("AlphaBit hits the wall and cry like a baby :("); }
  },
  {
    test: (command) => command.toUpperCase() === "TUN LEF",
    action: () => { AlphaBit.turnLeft(); Output.log("turn left"); }
  },
  {
    test: (command) => command.toUpperCase() === "TUN RIG",
    action: () => { AlphaBit.turnRight(); Output.log("turn right"); }
  },
  {
    test: (command) => command.toUpperCase() === "TUN BAC",
    action: () => { AlphaBit.turnBack(); Output.log("turn back"); }
  },
  {
    test: (command) => command.toUpperCase() === "TRA LEF",
    action: () => { AlphaBit.transformLeft() ? Output.log("transform to left") : Output.error("WTF??? Left??? Are you blind?"); }
  },
  {
    test: (command) => command.toUpperCase() === "TRA TOP",
    action: () => { AlphaBit.transformTop() ? Output.log("transform to top") : Output.error("WTF??? Top??? Are you blind?"); }
  },
  {
    test: (command) => command.toUpperCase() === "TRA RIG",
    action: () => { AlphaBit.transformRight() ? Output.log("transform to right") : Output.error("WTF??? Right??? Are you blind?"); }
  },
  {
    test: (command) => command.toUpperCase() === "TRA BOT",
    action: () => { AlphaBit.transformBottom() ? Output.log("transform to bottom") : Output.error("WTF??? Bottom??? Are you blind?"); }
  },
  {
    test: (command) => command.toUpperCase() === "MOV LEF",
    action: () => { AlphaBit.moveLeft() ? Output.log("move to left") : Output.error("I'm facing left now and there is a wall in front of me."); }
  },
  {
    test: (command) => command.toUpperCase() === "MOV TOP",
    action: () => { AlphaBit.moveTop() ? Output.log("move to top") : Output.error("I'm facing top now and there is a wall in front of me."); }
  },
  {
    test: (command) => command.toUpperCase() === "MOV RIG",
    action: () => { AlphaBit.moveRight() ? Output.log("move to right") : Output.error("I'm facing right now and there is a wall in front of me."); }
  },
  {
    test: (command) => command.toUpperCase() === "MOV BOT",
    action: () => { AlphaBit.moveBottom() ? Output.log("move to bottom") : Output.error("I'm facing bottom now and there is a wall in front of me."); }
  }
];
