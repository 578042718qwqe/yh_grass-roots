//编辑表格 模块
angular.module('addressFormatter', []).filter('address', function () {
    return function (input) {
        return input.street + ', ' + input.city + ', ' + input.state + ', ' + input.zip;
    };
});
var routerApp = angular.module('routerApp', ['toaster','ui.router', 'ui.grid', 'ui.grid.edit','ui.grid.selection','ui.grid.cellNav', 'addressFormatter','ui.grid.pagination',"data_path",'ngCookies','ngAnimate', 'ngSanitize','ui.bootstrap','ui.sortable'], ['$httpProvider', httpSupport]);//全局模块
routerApp.factory('myFactory', function($http,$q,$cookieStore) {
        var uid = $cookieStore.get("uid") ;
        var service ={id:[]};
        var getListUrl = 'management/sys/comp/getComponentByUserId';
        var filter = {uid:uid.name};
        $http.post(getListUrl,filter).success(function(data){
            service.id = data.obj;
        });
       return service;//返回这个Object对象
});
routerApp.controller('dh_tab',function ($scope,$http,$rootScope,data,$log,$cookieStore,$location) {
    var admin = $cookieStore.get("admin") ;
    //设置导航
    $scope.isActive = "设置";
    $rootScope.arr = [];
    $rootScope.Storage=window.sessionStorage;
    $scope.dh_show = function (name, url) {//导航栏
        $(".dh_name").show();
        $rootScope.gaoliang = name;
        $rootScope.isActive = name;
        $rootScope.Storage.name = name;
        var find = false;
        for(var i = 0; i < $rootScope.arr.length;i++) {
            if($rootScope.arr[i].name == name) {
                console.log($rootScope.arr[i]);
                find = true;
                break;
            }
        }
        if(!find) {
            var arts_s ={
                name:name,
                url:url
            };
            $rootScope.arr.push(arts_s);
        }
        setTimeout(function () {
            $scope.dh_with =$(".dh_name").width();
            $scope.dh_with_ul =$(".dh_name ul").width();
            $scope.dh_with_jl = $(".gaoliang").position().left;
            $scope.dh_with_w = $(".gaoliang").width();
            if(($scope.dh_with_jl+$scope.dh_with_w+120) > $scope.dh_with){
                console.log((($scope.dh_with_jl-$scope.dh_with)+$scope.dh_with_w));
                $(".dh_name_max").animate({ left:-(($scope.dh_with_jl-$scope.dh_with)+$scope.dh_with_w+180) });
            }else {
                $(".dh_name_max").animate({ left:"90px" })
            }
        },10);
    };
    $rootScope.names = $rootScope.arr;
    if($location.path() != "/welcome" && $rootScope.Storage.name != undefined){//刷新获取导航
        var arr = ($location.path()).split('/');
        arr.splice(0,1);
        var url = arr.join(".");
        var name = $rootScope.Storage.name;
        var obj={
            name : name,
            url : url
        };
        $rootScope.gaoliang = name;
        $rootScope.isActive = name;
        $rootScope.names.push(obj);
    }
    //读取导航
    $http({
        method: 'GET',
        url: getRequestUrl("menuData")
    }).then(function successCallback(response) {
        // 成功代码
        $scope.shezhi= response.data;
    });
    $http({//隐藏权限显示
        method: 'GET',
        url: getRequestUrl("admin")
    }).then(function successCallback(response) {
        console.log(response);
        response.data.forEach(function (data) {
            $scope.admin = data.url;
            $(".submenu-nav-content span").each(function () {
                if($(this).attr("ui-sref") == $scope.admin){
                    $(this).hide();
                }
            })
        });
    });
});
routerApp.controller('dh_qk',function ($rootScope) {//清空404页面
    $rootScope.arr.splice(0,$rootScope.arr.length);
});
routerApp.controller('dh_tab_right',function ($scope,$http,$rootScope,data,$log,$cookieStore,$location) {//导航右边
    $scope.navset = function (index,event) {
        $("#submenuTit").find("div span").removeClass("cur");
        $("#submenuTit").find("div span").eq(0).addClass("cur");
        $("#submenuCongtentBox").find("div").eq(0).show().siblings().hide();
    };
    $scope.admin = $cookieStore.get("admin");
    $scope.uid = $cookieStore.get("uid") ;
    //读取导航
    if($scope.uid == undefined || $scope.admin == undefined){
        alert("错误信息提示:非正常方式登陆");
        location.href="login.html";
    }else {
        $http({
            method: 'POST',
            url:"management/sys/module/getUserMenuByUserId",
            params:{uid:$scope.uid.name}
        }).success(function successCallback(response) {
            if($scope.uid == undefined){
                alert("错误信息提示:"+ response);
                location.href="login.html";
            }
            $scope.guanli = response.obj;
            $scope.dj = function (index,event) {
                $("#submenuCongtentBox").find("div").eq(index).show().siblings().hide();
                $(event.target).addClass("cur").parents("div").siblings().find("span").removeClass("cur");
            };
        }).error(function () {
            console.log("错误");
        });
    }
    //设置导航
    $scope.dh_show2 = function (name,url) {
        $(".dh_name").show();
        $rootScope.gaoliang = name;
        $rootScope.isActive = name;
        $rootScope.Storage.name = name;
        var find = false;
        for(var i = 0; i < $rootScope.arr.length;i++) {
            if($rootScope.arr[i].name == name) {
                console.log($rootScope.arr[i]);
                find = true;
                break;
            }
        }
        if(!find) {
            var arts_s ={
                name:name,
                url:url
            };
            $rootScope.arr.push(arts_s);
            console.log(arts_s,"导航数组")
        }
    };
    //退出
    $scope.logout = function () {
        $cookieStore.remove("admin");
        $cookieStore.remove("uid");
        window.location="login.html"
    }
});
routerApp.controller("dh_name",function ($scope,$rootScope,$state,$location) {//导航选项
    $scope.dh_name_max_l = function () {
        var dh_name_max_l = $(".dh_name_max").position().left;
        console.log(dh_name_max_l);
        if(dh_name_max_l < 90){
            $(".dh_name_max").animate({ left:"90px" })
        }
    };
    $scope.dh_name_max_r = function () {
        var dh_name_max_r = $(".dh_name_max").position().left;
        console.log(dh_name_max_r);
        if(dh_name_max_r = 90){
            $(".dh_name_max").animate({ left:"-1700px" })
        }
    };
    $scope.dh_click = function (event) {//导航点击
        $rootScope.gaoliang = $(event.target).text().trim();
        $rootScope.isActive = $(event.target).text().trim();
        $rootScope.Storage.name = $(event.target).text().trim();
    };
    $scope.dh_close = function (event) {//导航关闭
        var key = $(event.target).attr('data');
        $rootScope.names.splice(key,1);
        var url_go = $(event.target).parents("li").prev().attr("ui-sref");
        var url_text = $(event.target).parents("li").prev().text().trim();
        var url_text_next = $(event.target).parents("li").next().text().trim();
        if(url_go){
            $state.go(url_go);
            $rootScope.gaoliang = url_text;
            $rootScope.isActive = url_text;
        }
        if(url_go == undefined){
            if($(event.target).parents("li").next().attr("ui-sref") != undefined){
                $state.go($(event.target).parents("li").next().attr("ui-sref"));
                $rootScope.gaoliang = url_text_next;
                $rootScope.isActive = url_text_next;
            }else {
                $state.go("welcome");
                $(".dh_name").hide();
                console.log("不存在")
            }
        }
    };
});
// routerApp.config(function($httpProvider) {//拦截器
//     $httpProvider.interceptors.push('timestampMarker');
// });
// routerApp.factory('timestampMarker', function($rootScope,$location) {//拦截器
//     return {
//         response: function(response) {
//             if( response.status == 200){
//                 console.log("访问正常！！！")
//                 $rootScope.$emit('locaton_url')
//             }
//             console.log(response);
//             return response;
//         },
//        /* request :function(request) {
//          return request;
//          }*/
//     };
// });