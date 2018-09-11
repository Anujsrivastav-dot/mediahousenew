(function() {
    'use strict';
    app
        .config(Config)
        .controller('dashboardCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.dashboard', {
            url: '/dashboard',
            templateUrl: 'component/dashboard/dashboard.html',
            controller: 'dashboardCtrl',
            controllerAs: 'vm',
            data: {
                activeTab: 'dashboard'
            }
        })
    }

    function Controller($state) {
        var vm = this;


    }
})();