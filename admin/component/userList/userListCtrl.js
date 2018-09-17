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

    function Controller(helperService, httpService) {
        var vm = this;
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
            httpService.userList(vm.sendObj).then((objS) => {
                console.log(objS)
                if (objS.responseCode == 200) {
                    // get pagination object data
                    vm.paginationObj = helperService.getPaginationObj(objS.result);
                    console.log(vm.paginationObj);
                }
            })
        }

        //@ pre and next data
        function prevAndNext(flag, value) {
            if (!value) {
                // get page number bases of flag value
                vm.pageNumber = helperService.getPageNumber(flag, vm.pageNumber);
                // get assignment list
                init();
            }
        }



    }
})();