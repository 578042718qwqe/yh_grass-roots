/**
 * Created by wuzebo on 2017/12/5.
 */
var SERVER_URLS= [
    {name:'海南', path:'test/data/'}//测试数据
];
function getRequestUrl(url) {
    return SERVER_URLS[0].path+url;
    /*if($.cookie('region') == "海南"){
        return SERVER_URLS[0].path+url
    }if($.cookie('region') == "青岛"){
        return SERVER_URLS[1].path+url
    }*/
}
angular.module('data_path', ['ngCookies']).factory('data', function () {
    return{
        getRequestUrl: function(url){
            return SERVER_URLS[0].path+url
        }
    };
   /* if($.cookie('region')== undefined){
        window.location="login.html"
    }
    if($.cookie('region') == "海南"){
        return{
            getRequestUrl: function(url){
                return SERVER_URLS[0].path+url
            }
        };
    }if($.cookie('region') == "青岛"){
        return{
            getRequestUrl: function(url){
                return SERVER_URLS[1].path+url
            }
        };
    }else {
        alert("其他省份")
    }*/
});
/**
 * 获取完整服务请求url<br>
 * 为了使测试、联调工作顺利完成而不需要过多修改开发界面代码，在获取请求路径时统一使用getRequestUrl方法
 */
/*
 1、$http.get(url字符串，config可选的配置-对象类型) 返回HttpPromise对象
 2、$http.delete(url字符串，config可选的配置-对象类型) 返回HttpPromise对象
 3、$http.head(url字符串，config可选的配置-对象类型) 返回HttpPromise对象
 4、$http.jsonp(url字符串，config可选的配置-对象类型) 返回HttpPromise对象
 5、$http.post(url字符串，data对象或字符串，config可选的配置-对象类型) 返回HttpPromise对象
 6、$http.put(url字符串，data对象或字符串，config可选的配置-对象类型) 返回HttpPromise对象
 */
  /* $http({
          method: 'POST',
          url:"",
          params:{}
      }).success(function successCallback(response) {
          console.log(response);
      }).error(function () {
          console.log("错误");
      });
  */
// var url =[];
// $.ajax({
//     type: "GET",
//     url: "test/data/menuData2",
//     dataType: "json",
//     success: function (data){
//         data.forEach(function (data) {//遍历加载JS
//             for(objuct in data){//获取导航栏
//                 if(Object.prototype.toString.call(data[objuct])=='[object Array]'){
//                     data[objuct].forEach(function (data) {
//                         for(var i =0; i<data.child.length; i++){
//                             var sz = data.child[i].url;
//                             var sz2 = sz.split(".");
//                             url.push(data.templates+sz2[1]+".js");
//                         }
//                     });
//                 }
//             }
//         });
//     }
// });
// for(var i=0; i<url.length; i++){//动态加载JS
//     var loadScript = function(url) {
//         var script = document.createElement('script');
//         script.async = false;  // 这里
//         script.setAttribute('src', url+'?'+'time='+Date.parse(new Date()));
//         script.onload = function(){
//             console.log("script")
//         };
//         document.body.appendChild(script);
//     };
//     loadScript(url[i])
// }