(function() {
    'use strict';
    app
        .config(Config)
        .controller('loginCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'component/login/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm',
            data: {
                activeTab: 'login'
            }
        })
    }

    function Controller($state) {
        var vm = this;
        vm.login = login;

        function login(){
            $state.go('header.dashboard')
        }


    }
})();