"use strict";

var Commander = function() {
  var commanderInstance;
  
  function create() {
    var __sceneManager = null;
    var __availableId = [];
    var __spaceshipList = [];
    
    function canCreateSpaceship() {
      return __availableId.length > 0;
    }
    
    function addAvailableId(Id) {
      __availableId = __availableId.concat(Id);
    }
    
    function setScene(scene) {
      __sceneManager = scene;
    }
    
    function createSpaceship() {
      if(!__availableId.length) return false;
      var id = __availableId.shift();
      __sceneManager.createSpaceship(id);
      return id;
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
    
    function sendMessage(message) {
      if(!__sceneManager) {
        throw new Error("Commander Error: sceneManager was never assigned");
      }
      __sceneManager.broadcastMessage(message);
    }
    
    return {
      addAvailableId: addAvailableId,
      setScene: setScene,
      spaceshipMove: spaceshipMove,
      spaceshipStop: spaceshipStop,
      spaceshipDestruction: spaceshipDestruction,
      createSpaceship: createSpaceship,
      sendMessage: sendMessage,
      canCreateSpaceship: canCreateSpaceship
    };
  }
  
  return {
    getInstance: function() {
      return commanderInstance || (commanderInstance = create());
    }
  };
}();