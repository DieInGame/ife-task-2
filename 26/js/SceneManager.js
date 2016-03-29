"use strict";

class SceneManager {
  constructor() {
    this.__messageQueue = [];
    this.__spaceships = [];
    this.__commander = null;
    this.__spaceshipModle = null;
  }
  
  update() {
    for(let i = 0, len = this.spaceships.length; i < len; i++) {
      let spaceship = this.spaceships[i];
      if(spaceship.active) {
        spaceship.update && spaceship.update();
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
