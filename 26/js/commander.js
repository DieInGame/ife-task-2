"use strict";

var Commander = function() {
  var commanderInstance;
  
  function create() {
    var __sceneManager = null;
    var __availableId = [];
    var __spaceshipList = [];
    
    function addAvailableId(Id) {
      __availableId.concat(Id);
    }
    
    function setScene(scene) {
      __sceneManager = scene;
    }
    
    function createSpaceship() {
      var id = __availableId.shift();
      __sceneManager.createSpaceship(id);
    }
    
    function spaceshipMove(id) {
      sendMessage({
        id: id,
        command: "move"
      });
    }
    
    function spaceshipStop(id) {
      sendMessage({
        id: id,
        command: "stop"
      });
    }
    
    function spaceshipDestruction(id) {
      sendMessage({
        id: id,
        command: "destruction"
      });
      
      __availableId.push(id);
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
      addAvailableId: addAvailableId,
      setScene: setScene,
      spaceshipMove: spaceshipMove,
      spaceshipStop: spaceshipStop,
      spaceshipDestruction: spaceshipDestruction,
      createSpaceship: createSpaceship,
      sendMessage: sendMessage
    };
  }
  
  return {
    getInstance: function() {
      return commanderInstance || (commanderInstance = create());
    }
  };
}();