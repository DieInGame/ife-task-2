var canvas = document.getElementById("universe");
var sceneManager = new SceneManager();
sceneManager.commander = Commander.getInstance();
sceneManager.spaceshipModel = SpaceShip;
sceneManager.renderer = Renderer(canvas);

sceneManager.start();