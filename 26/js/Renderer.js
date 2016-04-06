"use strict";

var Renderer = function(canvas) {
  var ctx = canvas.getContext("2d");
  var __height = canvas.offsetHeight;
  var __width = canvas.offsetWidth;
  var __radiusOfEarth = __height < __width ? (__height / 8) : (__width / 8);
  var __radiusOfSpaceships = 20;
  
  function renderBackground() {
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, __width, __height);
    ctx.closePath();
  }
  
  function renderEarth() {
    ctx.beginPath();
    ctx.arc(__width / 2, __height / 2, __radiusOfEarth, 0, 2 * Math.PI);
    ctx.fillStyle = "#03A9F4";
    ctx.fill();
    ctx.closePath();
  }
  
  function renderSpaceship(power, radius, angle, color) {
    ctx.save();
    
    ctx.beginPath();
    ctx.translate(__width / 2, __height / 2);
    ctx.rotate(angle);
    ctx.arc(0, -radius, __radiusOfSpaceships, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(power, 0, -radius);
    ctx.closePath();
    
    ctx.restore();
  }
  
  return {
    context: ctx,
    renderBackground: renderBackground,
    renderEarth: renderEarth,
    renderSpaceship: renderSpaceship
  };
  
};