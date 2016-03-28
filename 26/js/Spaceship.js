"use script";

class SpaceShip {
  constructor(id) {
    this.__id = id;
    this.__power = 100;
    this.__state = "STOPING";
    this.__active = true;
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