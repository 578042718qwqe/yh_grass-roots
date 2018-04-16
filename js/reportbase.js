/**
 * Created by wuzebo on 2018/1/26.
 */
routerApp.directive("uiTable", function () {
    return {
        replace: true,
        restrict: 'ECMA',
        /*controller : ['$compile','$scope','$http',function($compile,$scope,$http){
         //内部传值
         }],*/
        template: '<div><div ui-grid="gridOptions" ui-grid-pagination ui-grid-selection class="grid"></div></div>'
    }
});

/**
 * $attrs:
 *   yh-model:value值,会自动选择上
 *   yh-data:{value:'',text:''} 只处理value和text,其他无视
 * @returns
 */
routerApp.directive("yhSelect", function () {
    return {
        replace: true,
        restrict: 'ECMA',
        scope: {yhData:'=',yhModel:'='},
        controller : ['$compile','$scope','$http','$element','$attrs',function($compile,$scope,$http,$element,$attrs){
        	
        	$scope.$watch('yhModel',function(newVal,oldVal){
        		
        		for(var idx in $scope.yhData) {
        			var item = $scope.yhData[idx];
        			if(item.value == newVal) {
        				//要===才可以..
        				$scope.yhModel = item.value;
        				break;
        			}
        		}
        	});
        }],
        template: '<span><select class="form-control" ng-model="yhModel" ng-options="item.value as item.text for item in yhData  "></select></span>'
    }
});

/**
 * 
 * yhModel:{select:'',lastId:''}
 *   select:默认选中,给''默认
 *   lastId:最后一个select选择的id
 * 地区级联
 */
routerApp.directive("yhRegion1", function () {
    return {
        replace: true,
        restrict: 'ECMA',
        scope: {yhModel:'='},
        controller : ['$compile','$scope','$http','$element','$attrs',function($compile,$scope,$http,$element,$attrs){
        	
        	$scope.yhData = [];
        	$scope.yhDataChildren = [];
        	$scope.showChildren = false;
        	$scope.childrenSelect = {select:''};
        	$scope.currSelect = '';
        	getCurrParentList();
        	function getCurrParentList() {
        		$http.post('management/maintenance/basicRegion/getParentList',{parentId:0}).success(function(data){
     				var rows = data.rows;
     				$scope.yhData = [];
     				$scope.yhData.push({value:'',text:'全部'});
     				for(var idx in rows) {
     					var item = rows[idx];
     					$scope.yhData.push({value:item.id,text:item.name});
     				}
     			});
        	}
        	$scope.$watch('currSelect',function(newVal,oldVal){
//        		console.log('change',newVal);
        		
        		if(newVal) {
        			$scope.yhModel.lastId = newVal;
        			$http.post('management/maintenance/basicRegion/getParentList',{parentId:newVal}).success(function(data){
         				var rows = data.rows;
         				$scope.yhDataChildren = [];
         				
         				for(var idx in rows) {
         					var item = rows[idx];
         					$scope.yhDataChildren.push({value:item.id,text:item.name});
         				}
         				if($scope.yhDataChildren.length > 0) {
         					$scope.showChildren = true;
         				} else {
         					$scope.showChildren = false;
         				}
         			});
            		
        		} else {
        			$scope.showChildren = false;
        		}
        		
        	});
        	
//        	$scope.$watch('childrenSelect.select',function(newVal,oldVal){
//        		if(newVal) {
//        			$scope.yhModel.lastId = newVal;
//        		}
//        	})
        	
        	//<yh-select  yh-model="yhModel.select" yh-data="yhData"></yh-select>
        }],
        template: '<span><yh-select yh-model="currSelect" yh-data="yhData"></yh-select><yh-region1-children ng-if="showChildren" yh-model="yhModel" yh-data="yhDataChildren"></yh-region1-children></span>'
    }
});

routerApp.directive("yhRegion1Children", function () {
    return {
        replace: true,
        restrict: 'ECMA',
        scope: {yhData:'=',yhModel:'='},
        controller : ['$compile','$scope','$http','$element','$attrs',function($compile,$scope,$http,$element,$attrs){
        	
        	$scope.showChildren = false;
        	$scope.yhDataChildren = [];
        	$scope.childrenSelect = {select:''};
        	$scope.currSelect = '';
        	
        	$scope.$watch('currSelect',function(newVal,oldVal){
//        		console.log('change',newVal);
        		
        		if(newVal) {
        			$scope.yhModel.lastId = newVal;
        			$http.post('management/maintenance/basicRegion/getParentList',{parentId:newVal}).success(function(data){
         				var rows = data.rows;
         				$scope.yhDataChildren = [];
         				for(var idx in rows) {
         					var item = rows[idx];
         					$scope.yhDataChildren.push({value:item.id,text:item.name});
         				}
         				if($scope.yhDataChildren.length > 0) {
         					$scope.showChildren = true;
         				} else {
         					$scope.showChildren = false;
         				}
         			});
            		
        		}
        		
        		
        	});
        	
//        	$scope.$watch('childrenSelect.select',function(newVal,oldVal){
//        		if(newVal) {
//        			$scope.yhModel.select = newVal;
//        			console.log('122',newVal);
//        		}
//        	})
        	
        }],
        template: '<span><yh-select yh-model="currSelect" yh-data="yhData"></yh-select><yh-region1-children ng-if="showChildren" yh-model="yhModel" yh-data="yhDataChildren"></yh-region1-children></span>'
    }
});
routerApp.directive("permissions", function () {
    return {
        replace:true,
        restrict:'ECMA',
        controller : ['$compile','$scope','$http','$element','$attrs','myFactory',function($compile,$scope,$http,$element,$attrs,myFactory){
            $scope.pertime = $attrs.permissions;
            $scope.permission = myFactory;
            $scope.permission_attr = [];
            $scope.$watch('permission.id',function(newVal,oldVal){
                var find = false;
                // angular.forEach($scope.permission,function (data) {
                //     for(code in data){
                //         $scope.permission_attr.push(data[code].code)
                //     }
                //     console.log(data);
                //     if($scope.permission_attr.indexOf($attrs.permissions) > 0){
                //         find = true;
                //     }
                // });
                for(var idx in newVal) {
                    var item = newVal[idx];
                    if(item.code == $scope.pertime) {
                        find = true;
                    }
                }

                //console.log($scope.pertime,newVal,find);
                if(find) {
                    $element.css('display','block');
                } else {
                    $element.css('display','none');
                }
            },true);

            // setTimeout(function () {
            //     $scope.$watch("permissionsobj",function () {
            //         $scope.permission = myFactory;
            //         $scope.arrs =[];
            //         angular.forEach($scope.permission,function (data) {
            //             for( code in data){
            //                 $scope.code  =  data[code].code;
            //                 $scope.arrs.push($scope.code)
            //             }
            //         });
            //         if($scope.arrs.indexOf($attrs.permissions) < 0){
            //             $element.css('display','none');
            //         }
            //     });
            // },10);
        }]
    }
});


;(function ($) {
    var g_option = function () {
        this.out = function () {
            //公共方法
        }
    };
    g_option.prototype ={
        init:function (url,b,c,searchBtn) {
            var _this = this;
            routerApp.controller(b,function ($scope, $http,$q,i18nService) {
            	
            	$scope.filter = {
        			pageIndex: 1,
        			pageSize: 10,
        			sort:'',//sort field
        			order:'',//asc desc
        			name: ''
        		}

                $("#"+searchBtn).click(function () {//点击查询
                    $scope.getPage();
                });
                i18nService.setCurrentLang('zh-cn');
                $scope.gridApi = null;
                $scope.pageIndex = 1;
                $scope.pageSize = 10;
                $scope.gridOptions ={
                    columnDefs: _this.columns(),
                    paginationPageSizes:[5,10, 20, 50,100],
                    //enableGridMenu: true,
                    enableSelectAll: true,//选择行
                    enableRowSelection: true,//选择行
                    multiSelect : true,//选择行
                    //selectionRowHeaderWidth: 35,
                    useExternalPagination: true,
                    useExternalSorting: true,
                    onRegisterApi: function(gridApi) {
                    	$scope.gridApi = gridApi;
                    	
                    	$scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
	                        if (sortColumns.length == 0) {
	                        	$scope.sort = null;
	                        } else {
	                        	$scope.sort = sortColumns[0].sort.direction;
	                        }
	                        $scope.getPage();
	                    });
                    	
                    	$scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
	                        $scope.filter.pageIndex = newPage;
	                        $scope.filter.pageSize = pageSize;
	                        console.log(newPage,pageSize);
	                        $scope.getPage();
	                    });
	                    
                    }
                };
                
                $scope.getPage = function() {
//                	var obj_search ={ };
                    $(c+" span input").each(function () {
                        var zz = $(this).attr("data-id");
                        $scope.filter[zz] = $(this).val();
                    });
//                    obj_search.pageIndex = $scope.pageIndex;
//                    obj_search.pageSize = $scope.pageSize;
                    $http({
                        method: 'POST',
                        /*  url:"/base/baseRegion/regionParent/1"*/
                        url:url,
                        params:$scope.filter
                    }).success(function successCallback(response) {
//                        console.log(response)
                        $scope.gridOptions.data = response.rows;
                        $scope.gridOptions.totalItems = response.total;
//                        $scope.$digest();
//                        console.log(response.total);
                    }).error(function () {
                        console.log("错误");
                    });
                }

                if(_this.clicks) {
                    _this.clicks($scope,$http,$q);
                }

                if(_this.exportFunction) {
                    _this.exportFunction($scope,$http,$q)
                }
                $scope.gridOptions.paginationPageSize = _this.page();
                $scope.anniu = function (a,b) {//回传数据
                    $scope.objects[a] = $scope.objects;
                    $scope.gridOptions.data.unshift($scope.objects[a]);
                    $(b).modal('hide');
                };
                $scope.delet = function (index) {//删除当前
                    $scope.gridOptions.data.splice(index,1);
                };
                /*$http({ //通过标示符查询方法
                 method:'post',
                 url:'http://localhost:8082/drgs/query',
                 data:{queryId:"DRG_EXA_MONTH",hospId:"286"}
                 }).success(function(req){
                 console.log(req);
                 }).error(function () {
                 console.log("错误");
                 });*/

            });
        },
        columns:function () { },//提取头部栏目
        clicks:function () { },//添加事件入口
        page:function (e) {
            return 10
        }
    };
    window.g_option = g_option;
})(jQuery);
