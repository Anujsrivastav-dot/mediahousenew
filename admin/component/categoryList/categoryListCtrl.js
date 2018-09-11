(function() {
    'use strict';
    app
        .config(Config)
        .controller('categoryListCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.categoryList', {
            url: '/categoryList',
            templateUrl: 'component/categoryList/categoryList.html',
            controller: 'categoryListCtrl',
            controllerAs: 'vm',
            data: {
                activeTab: 'categoryList'
            }
        })
    }

    function Controller($state) {
        var vm = this;
        vm.enquiry = enquiry;

        function enquiry(){
            $state.go('header.categoryList')
        }


    }
})();