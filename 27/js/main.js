var cvs = document.getElementById("universe");

/*
* 新建一个发令器
*/ 
var commander = new Commander();
commander.availableId = [1,2,3,4];
commander.renderer = Renderer(cvs);
commander.awake();

/*
* 创建控制面板
*/ 
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
      console.log("move",id);
    } else if(e.target.className == "stop") {
      console.log("stop",id);
    } else if(e.target.className == "destruct") {
     
     console.log("destruct",id);
    }
  });
  
  return spaceship;
}

var newSpaceshipButton = document.getElementsByClassName("new-spaceship")[0];
// newSpaceshipButton.disabled = !Commander.getInstance().canCreateSpaceship();
newSpaceshipButton.addEventListener('click', function(e) {
//   var shipInfo = Commander.getInstance().createSpaceship();
//   var spaceshipElement = createSpaceshipElement(shipInfo);
//   document.getElementsByClassName("console-panel-body")[0].appendChild(spaceshipElement);
//   newSpaceshipButton.disabled = !Commander.getInstance().canCreateSpaceship();
});




