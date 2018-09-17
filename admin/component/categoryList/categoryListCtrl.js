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

    function Controller(toastr, httpService, helperService) {
        var vm = this;
        vm.init = init;
        vm.prevAndNext = prevAndNext;
        vm.openModal = openModal;
        vm.add = add;
        vm.update = update;
        vm.pageNumber = 1;
        vm.confirm = confirm;
        vm.search = null;
        vm.init = init;


        init();

        function init() {
            vm.sendObj = {
                pageNumber: vm.pageNumber
            }
            if (vm.search) {
                vm.sendObj['search'] = vm.search;
            }
            httpService.categoryList(vm.sendObj).then((objS) => {
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



        function openModal(...arg) {
            if (arg[0] == 'add') {
                vm.form = null;
                vm.modalInfo = arg;
                $('#addEdit-category-modal').modal('show');
            } else if (arg[0] == 'edit') {
                vm.form = (arg[1]);
                vm.modalInfo = arg;
                $('#addEdit-category-modal').modal('show');
            } else {
                vm.modalInfo = arg;
                vm.message = "Do you want to delete this category ?"
                $('#confirm-modal').modal('show');
            }

        }


        // add category function
        function add() {
            httpService.addCategory(vm.form).then((objS) => {
                if (objS.responseCode == 200) {
                    $('#addEdit-category-modal').modal('hide');
                    toastr.success(objS.responseMessage)
                    init();

                }
            })
        }

        // update category function
        function update() {
            vm.sendObj = {
                name: vm.form.name
            }
            httpService.editCategory(vm.form._id, vm.sendObj).then((objS) => {
                if (objS.responseCode == 200) {
                    $('#addEdit-category-modal').modal('hide');
                    toastr.success(objS.responseMessage);
                    init();
                }
            })
        }

        // delete category function
        function confirm() {
            httpService.deleteCategory(vm.modalInfo[1]).then((objS) => {
                $('#confirm-modal').modal('hide');
                toastr.success(objS.responseMessage)
                objS.responseCode == 200 ? init() : '';
            })
        }
    }
})();