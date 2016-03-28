"use strict";

var Commander = function() {
  var commanderInstance;
  
  function create() {
    var __sceneManager = null;
    var __AvailableId = [];
    var __spaceshipList = [];
    
    function addAvailableId(Id) {
      __AvailableId.concat(Id);
    }
    
    function setScene(scene) {
      __sceneManager = scene;
    }
    
    function createSpaceship() {
      var id = __AvailableId.shift();
      __sceneManager.createSpaceship(id);
    }
    
    function sendMessage(id, command) {
      if(!__sceneManager) {
        throw new Error("Commander Error: sceneManager was never assigned");
      }
      var message = {
        id: id,
        command: command
      };
      __sceneManager.broadcastMessage(message);
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