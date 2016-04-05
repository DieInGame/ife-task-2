/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
    function $(id){
    return document.getElementById(id);
}
    var aqiData = {};
    cityInput=$("aqi-city-input");
    valueInput=$("aqi-value-input");
    addBtn=$("add-btn");
    table=$("aqi-table");
    tip_city=$("tip_city");
    tip_value=$("tip_value");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = cityInput.value.trim();
    var   value = valueInput.value.trim();
    if (!city.match(/^[\u4e00-\u9fa5aa-zA-z]+$/i)){
        document.getElementById("tip_city").innerHTML="城市只能含中英文字符";
        return ;
    }
    if(!value.match(/^\d*$/i))
    {
        document.getElementById("tip_value").innerHTML="空气质量只能含数字!";
        return ;
    }
    aqiData[city] = value;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tableNodes = [];
    var item = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for (var data in aqiData) {
        tableNodes.push("<tr>");
        tableNodes.push("<td>" + data + "</td>");
        tableNodes.push("<td>" + aqiData[data] + "</td>");
        tableNodes.push("<td ><button id='button' onclick='delBtnHandle(\""+data+"\")'>删除</button></td>");
        tableNodes.push("</tr>");
    }
    table.innerHTML =item+ tableNodes.join("");
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
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addBtn.addEventListener("click", addBtnHandle, false);
}

init();