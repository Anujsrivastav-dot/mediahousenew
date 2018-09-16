(function() {
    'use strict';
    app.config(Config).controller('productListCtrl', Controller);

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

    function Controller(toastr, httpService, helperService) {
        var vm = this;
        vm.openModal = openModal;
        vm.add = add;
        vm.update = update;
        vm.confirm = confirm;
        vm.pageNumber = 1;
        vm.confirm = confirm;
        vm.search = null;
        init();

        function init() {

            vm.sendObj = {
                pageNumber: vm.pageNumber
            }
            if (vm.search) {
                vm.sendObj['search'] = vm.search;
            }
            httpService.productList(vm.sendObj).then((objS) => {
                console.log("objS", objS);
                if (objS.responseCode == 200) {
                    // get pagination object data
                    vm.paginationObj = helperService.getPaginationObj(objS.result);
                    console.log(vm.paginationObj);
                }
            })
        }


        function openModal(...arg) {
            console.log("gfhfghg")
            if (arg[0] == 'add') {
                vm.form = null;
                vm.modalInfo = arg;
                $('#addEdit-product-modal').modal('show');
            } else if (arg[0] == 'edit') {
                // vm.form = _.clone(arg[1]);
                vm.modalInfo = arg;
                $('#addEdit-product-modal').modal('show');
            } else {
                vm.modalInfo = arg;
                vm.message = "Do you want to delete this product ?"
                $('#confirm-modal').modal('show');
            }
        }
        // add product function
        function add() {
            httpService.addProduct(vm.form).then((objS) => {
                if (objS.responseCode == 200) {
                    $('#addEdit-product-modal').modal('hide');
                    toastr.success(objS.responseMessage)
                }
            })
            // $('#addEdit-product-modal').modal('hide');
            // toastr.success("New product added successfully");
        }


        //find all category
        httpService.allCategoryList().then((objS) => {
            if (objS.responseCode == 200) {
                vm.category = objS.result;
            }
        })

        // update category function
        function update() {
            $('#addEdit-product-modal').modal('hide');
            toastr.success("Product updated successfully");
        }

        function confirm() {
            $('#confirm-modal').modal('hide');
            toastr.success("Product deleted successfully");
        }
    }
})();