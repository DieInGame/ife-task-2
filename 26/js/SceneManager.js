"use strict";

class SceneManager {
  constructor() {
    this.__spaceships = [];
    this.__commander = null;
    this.__spaceshipModle = null;
    this.__renderer = null;
    this.__intervalId = null;
  }
  
  start() {
    if(!this.commander) {
      throw new Error("It seems like you forget to set commander in scene");
    }
    if(!this.spaceshipModel) {
      throw new Error("It seems like you forget to set spaceship model in scene");
    }
    if(!this.renderer) {
      throw new Error("It seems like you forget to set renderer in scene");
    }
    this.__intervalId = window.setInterval(() => {
      this.update();
    }, 100);
  }
  
  update() {
    this.renderer.renderBackground();
    this.renderer.renderEarth();
    for(let i = 0, len = this.spaceships.length; i < len; i++) {
      let spaceship = this.spaceships[i];
      if(spaceship.active) {
        spaceship.update && spaceship.update();
        this.renderer.renderSpaceship(spaceship.power, spaceship.radius, spaceship.rotationAngle, "#FFFFFF");
      } else {
        this.spaceships.splice(i, 1); // remove unactive ship from scene
      }
    }
  }
  
  get spaceships() {
    return this.__spaceships;
  }
  
  set commander(commander) {
    this.__commander = commander;
    commander.setScene(this);
  }
  
  get commander() {
    return this.__commander;
  }
  
  set spaceshipModel(model) {
    this.__spaceshipModle = model;
  }
  
  get spaceshipModel() {
    return this.__spaceshipModle;
  }
  
  set renderer(renderer) {
    this.__renderer = renderer;
  }
  
  get renderer() {
    return this.__renderer;
  }
  
  createSpaceship(id) {
    var newSpaceship = new this.spaceshipModel(id);
    this.__spaceships.push(newSpaceship);
  }
  
  broadcastMessage(message) {
    for(let i = 0, len = this.spaceships.length; i < len; i++) {
      let spaceship = this.spaceships[i];
      spaceship.active && spaceship.messageHandler && spaceship.messageHandler(message);
    }
  }
}
