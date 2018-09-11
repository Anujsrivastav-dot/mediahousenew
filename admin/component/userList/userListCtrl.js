(function() {
    'use strict';
    app
        .config(Config)
        .controller('userListCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.userList', {
            url: '/userList',
            templateUrl: 'component/userList/userList.html',
            controller: 'userListCtrl',
            controllerAs: 'vm',
            data: {
                activeTab: 'userList'
            }
        })
    }

    function Controller($state) {
        var vm = this;
        vm.user = user;

        function enquiry(){
            $state.go('header.userList')
        }


    }
})();