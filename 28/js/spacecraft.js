class   Spacecraft{
    constructor(id, kind, radius, angle=0, color="#FFFFFF"){
        
        this._id            = id;
        this._power         = 100;
        this._state         = "STOPING";
        this._active        = true;
        this._radius        = radius;
        this._rotationAngle = angle;
        this.setKind(kind);
        this._color         = color;
        this._dc            = null;
        this._renderer      = null;
    }
    
    start(){
        if( !this._renderer) {
            throw new Error("Spacecraft" + this._id+"does not render");
        }
    }
    
    /*充电是持续的*/ 
    update(){
        this.charge(this._powerGrowth);
        if(this._state === "MOVING") {
            this.consumePower(this._consumption);
            this._rotationAngle = (this._rotationAngle + this._angularVelocity)%(Math.PI * 2);
        }
        if(this._power <=0) { this.stop();}
        //  重绘飞船
        this._active && this._renderer.renderSpaceship(this._power,this._radius,this._rotationAngle,this._color);
        this.BackTrack();
    }
    
    charge(volumnToAdd) {
        this._power += volumnToAdd;
        if(this._power > 100)
        this._power = 100;
    }
    consumePower(volumnToConsume) {
        this._power -= volumnToConsume;
        if(this._power < 0) {
        this._power = 0;
        }
    }
    setKind(k){
            var dynamic={
                0:{speed:3,consum:3},
                1:{speed:4,consum:5},
                2:{speed:5,consum:7}
            };
            var energy={
                "A":{charge:1},
                "B":{charge:2},
                "C":{charge:3}
            };
        this._angularVelocity = dynamic[k.dynamic].speed / this._radius; // Convert linear velocity to angular velocity
        this._consumption   = dynamic[k.dynamic].consum;
        this._powerGrowth   = energy[k.energy].charge;
    }
    
    move() {
        if(this._power > 0) {
        this._state = "MOVING";
        }
    }
    stop() {
        this._state = "STOPING";
    }
    destruct() {
        this._state = "DESTRUCTING";
        this.BackTrack();
        this._active = false;
    }
    // 2代处理消息
    messageHandler(message) {
        var msg = this.DeAdaptor(message);
        if(msg.id === this._id && this._active) {
            switch(msg.command) {
                case 'move':
                this.move();
                break;
                case 'stop':
                this.stop();
                break;
                case 'destruct':
                this.destruct();
                break;
            }
        }
    }
    
    /*
    *返回消息
    */ 
    BackTrack(){
        var msg ={
            id : this._id,
          state: this._state,
          power: this._power
        };
        var bus = this.Adaptor(msg);
        window.setTimeout(()=>{
            this._dc.Receive(bus);
        },10);
    }
    
    // 二进制翻译
    Adaptor(msg){
         switch(msg.state){
             case "MOVING":
                var state = "0001";
                break;
             case "STOPING":
                var state = "0010";
                break;
             case "DESTRUCTING":
                var state = "1100";
                break;   
         }
         
         var id = msg.id.toString(2);
         while(id.length <4){
             id = "0".concat(id);
         }
         
         var power = msg.power.toString(2);
         while(power.length < 8){
             power = "0".concat(power);
         }
         
         var bus = id.concat(state,power);
         return bus;
     }
    
    // 二进制解码
    DeAdaptor(str){
        var bus ={
            head:str.slice(0,4),
            body:str.slice(4,8)
        } ;
        var id = bus.head;
        var cmd = {"0001":"move","0010":"stop","1100":"destruct"};
        return {
            id:parseInt(id,2),
            command:cmd[bus.body]
        };
        
    }
    // 设置renderer
    set renderer(r){
        this._renderer = r;
    }
    get renderer(){
        return this._renderer;
    }
    // 设置DC
    set DC(dc){
        this._dc = dc;
    }
    get DC(){
        return this._dc;
    }
    
}