/**
 * Created by Administrator on 2017/8/4 0004.
 */
var app=angular.module('app',['ui.router','ngGrid', 'apis']);

app.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
})
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index/{id:[0-9]{1,4}}',
            templateUrl: 'tpls2/header.html'

        })
        .state('index.side',{
            url: '/side',
            templateUrl: 'tpls2/side.html'
        })
        .state('index.side.addform',{
            url: '/addform',
            templateUrl: 'tpls/bookDetail1.html'
        })
        .state('index.side.header',{
            url: '/header',
            templateUrl: 'tpls/bookDetail2.html'
        })
        .state('index.side.book',{
            url: '/book',
            templateUrl: 'tpls/bookDetail3.html'
        })
        .state('index.side.login',{
            url: '/login',
            templateUrl: 'tpls/bookDetail4.html'
        })
        .state('index.side.type',{
            url: '/type',
            templateUrl: 'tpls/bookDetail5.html'
        })
        .state('index.side.list',{
            url: '/list',
            templateUrl: 'tpls/bookDetail6.html'
        })
        .state('index.side.grid',{
            url: '/grid',
            templateUrl: 'tpls/bookDetail7.html'
        })
})