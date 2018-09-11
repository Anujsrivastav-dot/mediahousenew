(function() {
    'use strict';
    app.config(Config).controller('orderCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.order', {
            url: '/order',
            templateUrl: 'component/order/order.html',
            controller: 'orderCtrl',
            controllerAs: 'vm',
            data: {
                activeTab: 'order'
            }

        })
    }

    function Controller($state, $scope) {
        var vm = this;

    }
})();