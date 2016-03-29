"use script";

class SpaceShip {
  constructor(id, speed, radius) {
    this.__id = id;
    this.__power = 100;
    this.__state = "STOPING";
    this.__active = true;
    this.__radius = radius;
    this.__angularVelocity = speed / this.__radius; // Convert linear velocity to angular velocity
    this.__rotationAngular = 0;
    this.__consumption = 3;
    this.__powerGrowth = 1;
  }
  
  update() {
    if(this.__state === "MOVING") {
      this.consumePower(this.__consumption);
      this.__rotationAngle = (this.__rotationAngle + this.__angularVelocity) % Math.PI;
    }
    this.charge(this.__powerGrowth);
    if(this.__power <= 0) {
      this.stop();
    }
  }
  
  get active() {
    return this.__active;
  }
  
  get rotationAngle() {
    return this.__rotationAngle;
  }
  
  move() {
    if(this.__power > 0) {
      this.__state = "MOVING";
    }
  }
  
  stop() {
    this.__state = "STOPING";
  }
  
  charge(volumnToAdd) {
    this.__power += volumnToAdd;
    if(this.__power > 100)
      this.__power = 100;
  }
  
  consumePower(volumnToConsume) {
    this.__power -= volumnToConsume;
    if(this.__power) {
      this.__power = 0;
    }
  }
  
  destruction() {
    this.__active = false;
  }
  
  messageHandler(message) {
    if(message.id === this.__id) {
      switch(message.command) {
        case 'move':
          move();
          break;
        case 'stop':
          stop();
          break;
        case 'destruction':
          destruction();
          break;
      }
    }
  }
}