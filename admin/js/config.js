'use strict';
app.config(($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) => {
	$urlRouterProvider.otherwise('/login');
	$locationProvider.html5Mode(true);
})