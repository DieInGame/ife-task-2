"use strict";

var canvas = document.getElementById("universe");
Commander.getInstance().addAvailableId([1, 2, 3, 4]);
var sceneManager = new SceneManager();
sceneManager.commander = Commander.getInstance();
sceneManager.spaceshipModel = SpaceShip;
sceneManager.renderer = Renderer(canvas);

function createSpaceshipElement(shipInfo) {
  var id = shipInfo.id;
  var color = shipInfo.color;
  
  var spaceship = document.createElement('div');
  spaceship.className = "spaceship";
  spaceship.setAttribute("val", id);
  
  var spaceshipId = document.createElement('span');
  spaceshipId.className = "spaceshipId";
  spaceshipId.innerHTML = "Spaceship #" + id;
  spaceship.style.color = color;
  
  var moveButton = document.createElement("button");
  moveButton.className = "move";
  moveButton.innerHTML = "MOVE";
  
  var stopButton = document.createElement("button");
  stopButton.className = "stop";
  stopButton.innerHTML = "STOP";
  
  var destructButton = document.createElement("button");
  destructButton.className = "destruct";
  destructButton.innerHTML = "DESTRUCT";
  
  spaceship.appendChild(spaceshipId);
  spaceship.appendChild(moveButton);
  spaceship.appendChild(stopButton);
  spaceship.appendChild(destructButton);
  
  spaceship.addEventListener('click', function(e) {
    if(e.target.className == "move") {
      Commander.getInstance().spaceshipMove(id);
    } else if(e.target.className == "stop") {
      Commander.getInstance().spaceshipStop(id);
    } else if(e.target.className == "destruct") {
      Commander.getInstance().spaceshipDestruction(id);
      spaceship.remove();
      newSpaceshipButton.disabled = false; // enable new spaceship button
    }
  });
  
  return spaceship;
}

var newSpaceshipButton = document.getElementsByClassName("new-spaceship")[0];
newSpaceshipButton.disabled = !Commander.getInstance().canCreateSpaceship();
newSpaceshipButton.addEventListener('click', function(e) {
  var shipInfo = Commander.getInstance().createSpaceship();
  var spaceshipElement = createSpaceshipElement(shipInfo);
  document.getElementsByClassName("console-panel-body")[0].appendChild(spaceshipElement);
  newSpaceshipButton.disabled = !Commander.getInstance().canCreateSpaceship();
});

sceneManager.start();