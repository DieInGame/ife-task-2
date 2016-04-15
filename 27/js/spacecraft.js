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
    // 二进制解码
    DeAdaptor(str){
        var bus ={
            f:str.slice(0,4),
            l:str.slice(4,8)
        } ;
        var id = bus.f;
        var cmd = {"0001":"move","0010":"stop","1100":"destruct"};
        return {
            id:parseInt(id,2),
            command:cmd[bus.l]
        };
        
    }
    // 设置renderer
    set renderer(r){
        this._renderer = r;
    }
    get renderer(){
        return this._renderer;
    }
    
    
}