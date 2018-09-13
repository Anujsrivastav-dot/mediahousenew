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

    function Controller(toastr) {
        var vm = this;
        vm.enquiry = enquiry;
        vm.openModal = openModal;
        vm.confirm = confirm;

        function enquiry(){
            $state.go('header.enquiryList')
        }

        function openModal(...arg){
            vm.modalInfo = arg;
            vm.message = arg[1];
            $('#'+arg[0]).modal('show');
        }

        function confirm(){
            $('#'+vm.modalInfo[0]).modal('hide');
            toastr.success("Enquiry status updated")
        }


    }
})();