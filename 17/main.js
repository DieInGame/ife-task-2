/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(s) {
  // 确定是否选项发生了变化 

  // 设置对应数据
  pageState.nowGraTime = s;
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 设置对应数据
  var options = document.getElementsByTagName("option");
  for( var x in options){
      if(options[x].selected == true){
          pageState.nowSelectCity = x;
      }
  }
  
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radios = document.getElementsByName("gra-time");
    for( var x =0;x<radios.length;x++){
        radios[x].addEventListener("change",function (e) {
            console.log(e);
            graTimeChange(e.target.value);
        });
        
    }  
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select = document.getElementById("city-select");
  var value = -1;
  for(var x in aqiSourceData){
      value ++;
      var option = document.createElement("option");
      option.innerHTML =x;
      option.value = value
      select.appendChild(option);
      
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.addEventListener("change",function (e) {
    //   console.log(e.target);
      citySelectChange();
  })
}

/**
 * 初始化图表需要的数据格式
 * 关于数据格式转换，我的想法是这样的，一共有两次索引，城市和时间间隔。
 * 第一次索引决定显示数据，第二次索引决定数据如何合并，而且需要用title显示具体数据和时间
 * 所以可以预先生成数据，
 * ｛“北京”：｛“day”：。。;"week":..;"month":..｝;...｝
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(var x in aqiSourceData){
      chartData[x] = new Object({"day":{},"week":{},"month":{}});
    //   day data
      chartData[x]["day"] = aqiSourceData[x];
    //   month data
          var Jan=0;var Feb=0; var Mar = 0;
          var cal=0;
      for(var y in aqiSourceData[x]){
          if(/^2016-01/.test(y)){   
              Jan+=aqiSourceData[x][y];
          }else if(/^2016-02/.test(y)){            
              Feb+=aqiSourceData[x][y];
          }else if(/^2016-03/.test(y)){
              Mar+=aqiSourceData[x][y];
          }
          //   week data
          if(chartData[x]["week"][parseInt(cal/7)]==null) chartData[x]["week"][parseInt(cal/7)]=0;
          chartData[x]["week"][parseInt(cal/7)]+=aqiSourceData[x][y];
          cal ++;
          
      }
      chartData[x]["month"]={"Jan":Jan,"Feb":Feb,"Mar":Mar};
    
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  
  
}

init();
