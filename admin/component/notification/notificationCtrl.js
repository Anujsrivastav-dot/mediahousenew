(function() {
    'use strict';
    app
        .config(Config)
        .controller('notificationCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.notification', {
            url: '/notification',
            templateUrl: 'component/notification/notification.html',
            controller: 'notificationCtrl',
            controllerAs: 'vm',
            data: {
                activeTab: 'notification'
            }
        })
    }

    function Controller($state) {
        var vm = this;


    }
})();