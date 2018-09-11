(function() {
    'use strict';
    app
        .config(Config)
        .controller('enquiryListCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.enquiryList', {
            url: '/enquiryList',
            templateUrl: 'component/enquiryList/enquiryList.html',
            controller: 'enquiryListCtrl',
            controllerAs: 'vm',
            data: {
                activeTab: 'enquiryList'
            }
        })
    }

    function Controller($state) {
        var vm = this;
        vm.enquiry = enquiry;

        function enquiry(){
            $state.go('header.enquiryList')
        }


    }
})();