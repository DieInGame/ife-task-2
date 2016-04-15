class   Spacecraft{
    constructor(id, speed, radius, angle=0, color="#FFFFFF"){
        this._id            = id;
        this._power         = 100;
        this._state         = "STOPING";
        this._active        = true;
        this._radius        = radius;
        this._angularVelocity = speed / this._radius; // Convert linear velocity to angular velocity
        this._rotationAngle = angle;
        this._consumption   = 3;
        this._powerGrowth   = 1;
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
    // 1代处理消息
    messageHandler(message) {
        if(message.id === this._id && this._active) {
            switch(message.command) {
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
    
    // 设置renderer
    set renderer(r){
        this._renderer = r;
    }
    get renderer(){
        return this._renderer;
    }
    
    
}