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



    function Controller(toastr, httpService, helperService) {
        var vm = this;
        //vm.enquiry = enquiry;
        vm.openModal = openModal;
        vm.confirm = confirm;
        vm.init = init;
        vm.prevAndNext = prevAndNext;
        vm.pageNumber = 1;
        vm.search = null;



        init();

        function init() {
            vm.sendObj = {
                pageNumber: vm.pageNumber
            }
            if (vm.search) {
                vm.sendObj['search'] = vm.search;
            }
            httpService.enquiryList(vm.sendObj).then((objS) => {
                if (objS.responseCode == 200) {
                    vm.paginationObj = helperService.getPaginationObj(objS.result);
                }
            })
        }

        function prevAndNext(flag, value) {
            if (!value) {
                // get page number bases of flag value
                vm.pageNumber = helperService.getPageNumber(flag, vm.pageNumber);
                // get assignment list
                init();
            }
        }

        // function enquiry() {
        //     $state.go('header.enquiryList')
        // }

        function openModal(...arg) {
            vm.modalInfo = arg;
            vm.message = arg[1];
            $('#' + arg[0]).modal('show');
        }

        function confirm() {
           
            vm.sendObj = {
                enquiryId : vm.modalInfo[3],
                status : vm.modalInfo[2]
            }
            httpService.updateEnquiryStatus(vm.sendObj).then((objS) => {
                if (objS.responseCode == 200) {
                     $('#' + vm.modalInfo[0]).modal('hide');
                    init();
                    toastr.success(objS.responseMessage);
                }
            })
        }


    }
})();