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
  var id = shipInfo._id;
  var color = shipInfo._color;
  
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
      commander.createMsg(id,"move");
    } else if(e.target.className == "stop") {
      console.log("stop",id);
      commander.createMsg(id,"stop");
    } else if(e.target.className == "destruct") {
     commander.createMsg(id,"destruct");
     console.log("destruct",id);
     spaceship.remove();
     commander.addAvailableId(id);
     newSpaceshipButton.disabled = false;
    }
  });
  
  return spaceship;
}

// 飞船设定
var craft_kind = {dynamic:0,energy:"A"};
var spaceshipAttribute = document.getElementsByClassName("console-create")[0];
spaceshipAttribute.addEventListener('change',function(e) {
    console.log(e.target.value);
    craft_kind[e.target.name] = e.target.value;
});
// new飞船按钮事件
var newSpaceshipButton = document.getElementsByClassName("new-spaceship")[0];
newSpaceshipButton.addEventListener('click', function(e) {
  let craft = commander.addSpacecraft(craft_kind);
  var spaceshipElement = createSpaceshipElement(craft);
  document.getElementsByClassName("console-panel")[0].appendChild(spaceshipElement);
  newSpaceshipButton.disabled = !commander.canCreate();
});





