'use strict';
app.config(($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) => {
	$urlRouterProvider.otherwise('/order');
	$locationProvider.html5Mode(true);
})