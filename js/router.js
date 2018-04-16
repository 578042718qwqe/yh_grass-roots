/**
 * Created by wuzebo on 2017/12/5.
 */
routerApp.config(function($stateProvider,$urlRouterProvider) {//全局路由
    $urlRouterProvider.otherwise('/welcome');
    $stateProvider
        .state('home', {//导航页面
            url: '/home',//嵌套路由入口设置
            templateUrl: '/modules/dh_head.html'
        })
        .state('home.list', {//刷新请求
            url: '/list',
            templateUrl: '/modules/welcome.html'
        })
        .state('home.useredit', {//用户编辑
        	url: '/useredit',
        	templateUrl: '/modules/system/useredit.html'
        })
        .state('home.logger', {//日志查看
        	url: '/logger',
        	templateUrl: '/modules/system/logger.html'
        })
        .state('home.user', {//用户
            url: '/user',
            templateUrl: '/modules/system/user.html'
        })
        .state('home.role', {//角色
            url: '/role',
            templateUrl: '/modules/system/role.html'
        })
         .state('home.module', {//角色
            url: '/module',
            templateUrl: '/modules/system/module.html'
        })
        .state('home.hosp', {//角色
            url: '/hosp',
            templateUrl: '/modules/system/hosp.html'
        })
        .state('home.comp', {//角色
            url: '/comp',
            templateUrl: '/modules/system/comp.html'
        })
        .state('home.base_region', {//基础数据维护
            url: '/base_region',
            templateUrl: '/modules/maintenance/base_region.html'
        })
        .state('home.base_dept', {//基础科室
            url: '/base_dept',
            templateUrl: '/modules/maintenance/basic_dept.html'
        })
        .state('home.dic_common', {//基础数据字典
        	url: '/dic_common',
        	templateUrl: '/modules/maintenance/dic_common.html'
        })
        .state('home.dic_form', {//
        	url: '/dic_form',
        	templateUrl: '/modules/maintenance/dic_form.html'
        })
        .state('home.basic_form_usage', {//
        	url: '/basic_form_usage',
        	templateUrl: '/modules/maintenance/basic_form_usage.html'
        })
        .state('home.basic_ins_type', {//
        	url: '/basic_ins_type',
        	templateUrl: '/modules/maintenance/basic_ins_type.html'
        })
        .state('home.basic_vaccine', {//
        	url: '/basic_vaccine',
        	templateUrl: '/modules/maintenance/basic_vaccine.html'
        })
        .state('home.basic_diagnose', {//
        	url: '/basic_diagnose',
        	templateUrl: '/modules/maintenance/basic_diagnose.html'
        })
        .state('home.basic_hormone', {//
        	url: '/basic_hormone',
        	templateUrl: '/modules/maintenance/basic_hormone.html'
        })
        .state('home.basic_med_usage', {//
        	url: '/basic_med_usage',
        	templateUrl: '/modules/maintenance/basic_med_usage.html'
        })
        .state('home.basic_usage_freq', {//
        	url: '/basic_usage_freq',
        	templateUrl: '/modules/maintenance/basic_usage_freq.html'
        })
        .state('home.dic_operation', {//
        	url: '/dic_operation',
        	templateUrl: '/modules/maintenance/dic_operation.html'
        })
        .state('home.dic_med_record', {//
        	url: '/dic_med_record',
        	templateUrl: '/modules/maintenance/dic_med_record.html'
        })
        .state('home.dic_palpate', {//
        	url: '/dic_palpate',
        	templateUrl: '/modules/maintenance/dic_palpate.html'
        })
        .state('home.dic_public_health', {//
        	url: '/dic_public_health',
        	templateUrl: '/modules/maintenance/dic_public_health.html'
        })
        .state('welcome', {//初始页面
            url: '/welcome',
            templateUrl: '/modules/welcome.html'
        })
});