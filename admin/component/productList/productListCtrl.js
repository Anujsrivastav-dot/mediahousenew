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

    function Controller(toastr) {
          var vm = this;
        vm.openModal = openModal;
        vm.add = add;
        vm.update = update;
        vm.confirm = confirm;

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


        // add category function
        function add() {
            $('#addEdit-product-modal').modal('hide');
            toastr.success("New product added successfully");
        }

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