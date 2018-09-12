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

    function Controller($state, httpService, toastr) {
        var vm = this;
        // Initialize form
        vm.loginForm = {
            emailId: "admin@gmail.com",
            password: "12345678"
        };
        //@ login function
        vm.login = login;

        function login() {
            httpService.login(vm.loginForm).then((objS) => {
                console.log(objS)
                if (objS.responseCode == 200) {
                    localStorage.setItem('authtoken', objS.result.authtoken);
                    toastr.success(objS.responseMessage);
                    $state.go('header.dashboard')
                }

            })

        }


    }
})();