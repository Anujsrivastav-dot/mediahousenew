app.run(function($rootScope, $location) {
	// update active tab on state change
	$rootScope.default_product = "dist/img/default_product.png";
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		$rootScope.activeTab = toState.data.activeTab;
		if (!localStorage.authtoken) {
		// REdirect to login page                
		  $location.path('/login')
		}
	});
})