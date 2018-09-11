app.run(function($rootScope, $location) {
	// update active tab on state change
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		console.log(toState.data.activeTab)
		$rootScope.activeTab = toState.data.activeTab;
		//if (!localStorage.authtoken) {
		// REdirect to login page                
		//  $location.path('/login')
		// }
	});
})