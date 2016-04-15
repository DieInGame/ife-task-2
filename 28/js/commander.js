/*
* 控制器类。
*/ 
class Commander{
    
    constructor(){
        this._spacecrafts = [];
        this._available_id= [];
        // this._max_crafts  = 4;

        this._latency     = 300;        //消息延迟
        this._fps         = 500;        //刷新率
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
        },this._fps);
    }
    
    update(){
        this._renderer.renderBackground();
        this._renderer.renderPlanet();
        // remove all unactive ship
        this._spacecrafts = this._spacecrafts.filter((craft)=>{
            
            return craft._active
        });
        // update spacecrafts
        for(var i =0; i < this._spacecrafts.length;i++){
            let craft = this._spacecrafts[i];
            craft.update();
        }
    }
    
    /*创建飞船*/
    addSpacecraft(craftkind){
        if(this._available_id.length === 0) return false;
        var id = this._available_id.shift();
        return this.createSpacecraft(id,craftkind);
    }
     
    createSpacecraft(id,craftkind){
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
        
        var newSpacecraft = new Spacecraft(id, craftkind, randomRadius, randomAngle, randomColor);
        newSpacecraft.renderer = this._renderer;
        this._spacecrafts.push(newSpacecraft);
        return newSpacecraft;
    }
    
    /*消息传输*/
    createMsg(int,str) {
        var msg = {id:int,command:str};
        var bus = this.Adaptor(msg);
        this.broadcastMsg(bus);
    }
    /*二进制翻译*/
     Adaptor(msg){
         
         switch(msg.command){
             case "move":
                var latter = "0001";
                break;
             case "stop":
                var latter = "0010";
                break;
             case "destruct":
                var latter = "1100";
                break;   
         }
         var former = msg.id.toString(2);
         var bus = former.concat(latter);
        while(bus.length <8){
             bus = "0".concat(bus);
         }
         return bus;
     }
     
    /*自动重连*/ 
    broadcastMsg(msg){
        let successRate = 0.9;// 信息成功率
        if( Math.random() > successRate) {
            window.setTimeout(()=>{
                console.log("正在尝试重新发送");
                this.broadcastMsg(msg);
            },this.latency);
        } else{
            window.clearTimeout();
            for(let x in this._spacecrafts){
                this._spacecrafts[x].messageHandler(msg);
            }
        }    
    }
    
    // 判别是否可以添加更多飞船
    canCreate(){
        return this._available_id.length > 0;
    }
    
    /*添加可用的ID库*/ 
    set availableId(ids){
        this._available_id = ids;
    }
    get availableId(){
        return this._available_id;
    }
    addAvailableId(id) {
        this._available_id.push(id);
    }
    
    /*add renderer*/ 
    set renderer(r){
        this._renderer = r;
    }
    get renderer(){
        return this._renderer;
    }
    
}