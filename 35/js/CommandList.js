'use strict';

var CommandList = [
  {
    test: (command) => command.toUpperCase() === "GO",
    action: () => { Alphabit.go() ? Output.log("go forward one step") : Output.error("AlphaBit hits the wall and cry like a baby :("); }
  },
  {
    test: (command) => command.toUpperCase() === "TUN LEF",
    action: () => { Alphabit.turnLeft(); Output.log("turn left"); }
  },
  {
    test: (command) => command.toUpperCase() === "TUN RIG",
    action: () => { Alphabit.turnRight(); Output.log("turn right"); }
  },
  {
    test: (command) => command.toUpperCase() === "TUN BAC",
    action: () => { Alphabit.turnBack(); Output.log("turn back"); }
  },
  {
    test: (command) => command.toUpperCase() === "TRA LEF",
    action: () => { Alphabit.transformLeft() ? Output.log("transform to left") : Output.error("WTF??? Left??? Are you blind?"); }
  },
  {
    test: (command) => command.toUpperCase() === "TRA TOP",
    action: () => { Alphabit.transformTop() ? Output.log("transform to top") : Output.error("WTF??? Top??? Are you blind?"); }
  },
  {
    test: (command) => command.toUpperCase() === "TRA RIG",
    action: () => { Alphabit.transformRight() ? Output.log("transform to right") : Output.error("WTF??? Right??? Are you blind?"); }
  },
  {
    test: (command) => command.toUpperCase() === "TRA BOT",
    action: () => { Alphabit.transformBottom() ? Output.log("transform to bottom") : Output.error("WTF??? Bottom??? Are you blind?"); }
  },
  {
    test: (command) => command.toUpperCase() === "MOV LEF",
    action: () => { Alphabit.moveLeft() ? Output.log("move to left") : Output.error("I'm facing left now and there is a wall in front of me."); }
  },
  {
    test: (command) => command.toUpperCase() === "MOV TOP",
    action: () => { Alphabit.moveTop() ? Output.log("move to top") : Output.error("I'm facing top now and there is a wall in front of me."); }
  },
  {
    test: (command) => command.toUpperCase() === "MOV RIG",
    action: () => { Alphabit.moveRight() ? Output.log("move to right") : Output.error("I'm facing right now and there is a wall in front of me."); }
  },
  {
    test: (command) => command.toUpperCase() === "MOV BOT",
    action: () => { Alphabit.moveBottom() ? Output.log("move to bottom") : Output.error("I'm facing bottom now and there is a wall in front of me."); }
  }
];
