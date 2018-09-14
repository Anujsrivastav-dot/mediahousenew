(function() {
    'use strict';
    app.config(Config).controller('headerCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header', {
            url: '',
            templateUrl: 'component/header/header.html',
            controller: 'headerCtrl',
            controllerAs: 'vm',
        })
    }

    function Controller($state, $scope) {
        var vm = this;
        vm.logOut = logOut;

        function logOut(){
            localStorage.removeItem("authtoken");
            $state.go('login')
        }

    }
})();