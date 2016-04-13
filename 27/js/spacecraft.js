class   Spacecraft{
    constructor(id, speed, radius, angle=0, color="#FFFFFF"){
        this._id = id;
        this._power = 100;
        this._state = "STOPING";
        this._active = true;
        this._radius = radius;
        this._angularVelocity = speed / this._radius; // Convert linear velocity to angular velocity
        this._rotationAngle = angle;
        this._consumption = 3;
        this._powerGrowth = 1;
        this._color = color;
    }
    
    start(){
        
    }
    
    update(){
        
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
    destruction() {
        this.__active = false;
    }
    // 处理消息
    messageHandler(message) {
        if(message.id === this.__id) {
            switch(message.command) {
                case 'move':
                this.move();
                break;
                case 'stop':
                this.stop();
                break;
                case 'destruction':
                this.destruction();
                break;
            }
        }
    }
}