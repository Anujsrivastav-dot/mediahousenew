(function() {
    'use strict';
    app
        .config(Config)
        .controller('offerCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.offer', {
            url: '/offer',
            templateUrl: 'component/offer/offer.html',
            controller: 'offerCtrl',
            controllerAs: 'vm',
            data: {
                activeTab: 'offer'
            }
        })
    }

    function Controller($state) {
        var vm = this;


    }
})();