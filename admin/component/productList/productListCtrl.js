(function() {
    'use strict';
    app
        .config(Config)
        .controller('productListCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.productList', {
            url: '/productList',
            templateUrl: 'component/productList/productList.html',
            controller: 'productListCtrl',
            controllerAs: 'vm',
            data: {
                activeTab: 'productList'
            }
        })
    }

    function Controller($state) {
        var vm = this;
        vm.enquiry = enquiry;

        function enquiry(){
            $state.go('header.productList')
        }


    }
})();