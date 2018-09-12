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

    function Controller($state) {
        var vm = this;
        vm.openModal = openModal;

        function openModal(...arg) {
            console.log("comes in modal");
            if (arg[0] == 'add') {
                vm.form = null;
                vm.modalInfo = arg;
                $('#addEdit-category-modal').modal('show');
            } else if (arg[0] == 'edit') {
                vm.form = _.clone(arg[1]);
                vm.modalInfo = arg;
                $('#addEdit-category-modal').modal('show');
            } else {
                vm.modalInfo = arg;
                vm.message = "Do you want to delete this category ?"
                $('#confirmation-modal').modal('show');
            }

        }


        // function Controller($state) {
        //     var vm = this;
        //     vm.enquiry = enquiry;

        //     function enquiry() {
        //         $state.go('header.categoryList')
        //     }

        // }
    }
})();