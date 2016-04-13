/*
* render 共有渲染方法
*/

var cvs = document.getElementById("universe");

function Renderer(canvas){
    var ctx     = canvas.getContext("2d");
    var _height = canvas.offsetHeight;
    var _width  = canvas.offsetWidth;
    var _radius_planet = _height < _width ? (0.1*_height):(0.1*_width); 
    var _len_craft = 20;
    
    function renderBackground(){
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,_width,_height);
        ctx.closePath();
    }
    
    function renderPlanet() {
        ctx.beginPath();
         ctx.moveTo(_width/2,_height/2);
           
         ctx.arc(_width/2,_height/2,_radius_planet,0,2*Math.PI);
         ctx.fillStyle = "#FFFACD";
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
        renderPlanet: renderPlanet,
        renderSpaceship: renderSpaceship
    };
}