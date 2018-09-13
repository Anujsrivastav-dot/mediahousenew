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

    function Controller(toastr) {
        var vm = this;
        vm.openModal = openModal;
        vm.add = add;
        vm.update = update;
        vm.confirm = confirm;

        function openModal(...arg) {
            if (arg[0] == 'add') {
                vm.form = null;
                vm.modalInfo = arg;
                $('#addEdit-category-modal').modal('show');
            } else if (arg[0] == 'edit') {
               // vm.form = _.clone(arg[1]);
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
            $('#addEdit-category-modal').modal('hide');
            toastr.success("New category added successfully");
        }

        // update category function
        function update() {
            $('#addEdit-category-modal').modal('hide');
            toastr.success("Category upadated successfully");
        }

        function confirm() {
            $('#confirm-modal').modal('hide');
            toastr.success("Category deleted successfully");
        }
    }
})();