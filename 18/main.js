/**
 * 读题，在头尾进行操作，显然是一个链表。
 * 而在js中 Array数组本身所具备的如下函数
 * push pop堆栈操作
 * shift unshift 逆堆栈操作
 * splice 链表操作
 */
var list = new Array();
list = [10];

var container = document.getElementsByClassName("container");
var span_list = document.getElementsByTagName("span");
var num     = document.getElementById("input");

/**
 * 渲染数组
 */
function render() {
    while(span_list.length>0){
        container[0].removeChild(span_list[span_list.length-1]);
    }
    for(var x in list){
        var node = document.createElement("span");
        node.innerHTML = list[x];
        container[0].appendChild(node);
    }
} 

function init() {
  
  
  document.getElementById("l+").addEventListener("click",function(){
      
      list.unshift(parseInt(num.value) );
      render();
  });
  document.getElementById("l-").addEventListener("click",function(){
      list.shift( );
      render();
  });
  document.getElementById("r+").addEventListener("click",function(){
       list.push(parseInt(num.value) );
      render();
  });
  document.getElementById("r-").addEventListener("click",function(){
       list.pop( );
      render();
  });
  
}

init();