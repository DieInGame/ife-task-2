/*
* 控制器类。
*/ 
class Commander{
    
    constructor(){
        this._spacecrafts = [];
        this._available_id= [];
        this._spacecraft_model = null;  //飞船类型
        this._latency     = 300;        //消息延迟
        this._fps         = 100;        //刷新率
        this._renderer    = null;       //
    }
    
    /*check step*/ 
    awake(){
        if(this._available_id === []){
            throw new Error("there is no available id");
        }
        if(!this.renderer) {
            throw new Error("It seems like you forget to set renderer in scene");
        }
        this.start();
    }
    
    /*Init*/ 
    start(){
        this.renderer.renderBackground();
        this.renderer.renderPlanet();
        // call update()
        window.setInterval(()=>{
           this.update(); 
        },this.fps);
    }
    
    update(){
        // remove all unactive ship
        this._spacecrafts = this._spacecrafts.filter((craft)=>{craft._active});
        // update spacecrafts
        for(var i =0; i < this._spacecrafts.length;i++){
            let craft = this._spacecrafts[i];
            craft.update();
        }
    }
    
    /*创建飞船*/ 
    createSpacecraft(id,dynamic,energy){
        /*飞船各项随机参数*/ 
        var randomRadius = Math.floor(Math.random() * (200 - 70)) + 70; // random radius between 70 and 200
        var randomColor = function() { // random generate a color for new ship
            var color = "#";
            for(let i = 0; i < 3; i++) {
                color += (Math.floor(Math.random() * (200 - 100)) + 100).toString(16); // random color should not be too dark or too light
            }
            return color;
        }();
        var randomAngle = Math.random() * Math.PI * 2; // random start angle
        
        var newSpacecraft = new this._spacecraft_model(id, 5, randomRadius, randomAngle, randomColor);
        this._spacecrafts.push(newSpacecraft);
        return newSpacecraft;
    }
    
    /*消息传输*/
    broadcastMsg(bus){
        window.setTimeout(()=>{
            
        },this.latency);
    }
    
    /*添加可用的ID库*/ 
    set availableId(ids){
        this._available_id = ids;
    }
    get availableId(){
        return this._available_id;
    }
    /*add renderer*/ 
    set renderer(r){
        this._renderer = r;
    }
    get renderer(){
        return this._renderer;
    }
    
}