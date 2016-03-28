"use strict";

var Commander = function() {
  var commanderInstance;
  
  function create() {
    var __mediator = null;
    var __spaceshipModel = null;
    var __AvailableId = [];
    var __spaceshipList = [];
    
    function addAvailableId(Id) {
      __AvailableId.concat(Id);
    }
    
    function setSpaceshipModel(model) {
      __spaceshipModel = model;
    }
    
    function setMediator(mediator) {
      __mediator = mediator;
    }
    
    function createSpaceship() {
      var id = __AvailableId.shift();
      // TODO: create spaceship
    }
    
    function sendMessage(id, command) {
      if(!__mediator) {
        throw new Error("Commander Error: mediator was never assigned");
      }
      var message = {
        id: id,
        command: command
      };
      // TODO: send message to mediator
    }
    
    return {
      createSpaceship: createSpaceship,
      sendMessage: sendMessage
    };
  }
  
  return {
    getInstance: function() {
      return commanderInstance || (commanderInstance = create());
    }
  };
};