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
    this.__spaceships = this.__spaceships.filter((ship) => ship.active); // remove all unactive ship
    for(let i = 0, len = this.spaceships.length; i < len; i++) {
      let spaceship = this.spaceships[i];
      spaceship.update && spaceship.update();
      this.renderer.renderSpaceship(spaceship.power, spaceship.radius, spaceship.rotationAngle, spaceship.color);
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
    var radius = Math.floor(Math.random() * (200 - 70)) + 70; // random radius between 70 and 200
    var randomColor = function() { // random generate a color for new ship
      var color = "#";
      for(let i = 0; i < 3; i++) {
        color += (Math.floor(Math.random() * (200 - 100)) + 100).toString(16); // random color should not be too dark or too light
      }
      return color;
    }();
    var newSpaceship = new this.spaceshipModel(id, 5, radius, randomColor);
    this.__spaceships.push(newSpaceship);
  }
  
  broadcastMessage(message) {
    var delay = 1000; // delay 1 second
    window.setTimeout(() => {
      for(let i = 0, len = this.spaceships.length; i < len; i++) {
        let spaceship = this.spaceships[i];
        let successRate = 0.7;
        Math.random() < successRate && spaceship.active && spaceship.messageHandler && spaceship.messageHandler(message);
      }
    }, delay);
  }
}
