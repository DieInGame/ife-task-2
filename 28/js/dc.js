// 单例化数据中心类
class DataCentre {
    constructor(){
        this._render_list = {};
        this._info_list = {};
        this._name       = "DC is not Marvel";
    }
    
    Receive(info){
        var craft_info = this.DeAdaptor(info);
        var num = craft_info.id;
        this._info_list[num].id=(craft_info).id;
        this._info_list[num].state=(craft_info).state;
        this._info_list[num].power=(craft_info).power;
        for(let x in this._info_list){
            let info = this._info_list[x];
            
            this.render(info);
            this._render_list[x] = true;
        }
    }
    
    DeAdaptor(str){
        var bus ={
            head:str.slice(0,4),
            body:str.slice(4,8),
            foot:str.slice(8,16)
        } ;
        var id = bus.head;
        var cmd = {"0001":"move","0010":"stop","1100":"destruct"};
        return {
            id:parseInt(id,2),
            state:cmd[bus.body],
            power:parseInt(bus.foot,2)
        };
        
    }
    
    // 
    render(info){
        var id = info.id;
        var d = info.dynamic;
        var e = info.energy;
        var state = info.state;
        var power = info.power;
        if(this._render_list[id] === true){
            this.refreshNode(id,d,e,state,power);
        }else{
            this.createNode(id,d,e,state,power);    
        }
        
        
    }
    createNode(id,d,e,state,power){
        var table = document.getElementById("console-log");
        var tr    = document.createElement("tr");
        tr.id = id;
        var ID    = document.createElement("td");
        ID.innerHTML = id;
        var Dy    = document.createElement("td");
        Dy.innerHTML = d;
        var En    = document.createElement("td");
        En.innerHTML = e;
        var STATE = document.createElement("td");
        STATE.innerHTML = state;
        var POWER = document.createElement("td");
        POWER.innerHTML = power;
        tr.appendChild(ID);
        tr.appendChild(Dy);
        tr.appendChild(En);
        tr.appendChild(STATE);
        tr.appendChild(POWER);
        table.appendChild(tr);
    }
    refreshNode(id,d,e,state,power){
        var tr   = document.getElementById(id);
        var info = tr.getElementsByTagName("td");
        info[1].innerHTML = d;
        info[2].innerHTML = e;
        info[3].innerHTML = state;
        info[4].innerHTML = power;
    }
    
    saveInfo(id,kind){
        var dynamic = {
            0:" Mars",1:"Luppiter",2:"Apollo"
        }
        
        this._info_list[id]={
            id:"",
            dynamic:dynamic[kind.dynamic],
            energy:"Model" + kind.energy,
            state:"",
            power:""
        }
    }
}