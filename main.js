/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = new Array();

var data_table = document.getElementById("aqi-table");
var btn_add    = document.getElementById("add-btn");
var btn_delete = document.getElementsByClassName("btn-del");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var data_city  = document.getElementById("aqi-city-input").value;
    var data_value = document.getElementById("aqi-value-input").value;
    
    // aqiData[data_city] = data_value;
    aqiData.push({key:data_city,value:data_value});
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var node_list = data_table.getElementsByTagName("tr");
    
    // clear former list
    for(var x=1;x <node_list.length;x++){
        data_table.removeChild(node_list[x]);
    }
    
    // add arry to list node.
    for(var x in aqiData){
        
        var node = document.createElement("tr");
        var td1  = document.createElement("td");
        var td2  = document.createElement("td");
        var t1 = document.createTextNode(aqiData[x].key);
        var t2 = document.createTextNode(aqiData[x].value);
        var bt = document.createElement("button");
        bt.className = "btn-del";
        bt.innerHTML = "删除";
        td1.appendChild(t1);
        td2.appendChild(t2);
        node.appendChild(td1);
        node.appendChild(td2);
        node.appendChild(bt);
        node.id = x;
        if(aqiData[x].key){
            
            data_table.appendChild(node);
          
        }
        
        // data_table.appendChild(title);
    }
    if(btn_delete){
    for(var x in btn_delete){  
        btn_delete[x].addEventListener("click",delBtnHandle);
    }
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  
  addAqiData();
  renderAqiList();
  
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
//   the true thing we need todo,but now we just need to delete the data.
  
//   child = this.parentNode.parentNode;
//   child.parentNode.removeChild(child);
  child = this.parentNode;
  console.log(child.id);
  aqiData = aqiData.slice(child.id,1);
  
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  btn_add.addEventListener("click",addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    if(btn_delete){
        for(var x in btn_delete){  
            btn_delete[x].addEventListener("click",delBtnHandle);
        }
    }
  
}

init();