(function() {
    'use strict';
    app.config(Config).controller('orderCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.order', {
            url: '/order',
            templateUrl: 'component/order/order.html',
            controller: 'orderCtrl',
            controllerAs: 'vm',
            data: {
                activeTab: 'order'
            }

        })
    }

    function Controller(toastr) {
        var vm = this;
        vm.openModal = openModal;

     
        vm.confirm = confirm;

        function openModal(...arg) {
            if (arg[0] == 'confirm') {
                vm.form = null;
                vm.modalInfo = arg;
                vm.message = "Do you want to confirm this order ?"
            }  else {
                vm.modalInfo = arg;
                vm.message = "Do you want to cancel this order ?"
                
            }
            $('#confirm-modal').modal('show');

        }

        function confirm() {
            var msg = vm.modalInfo[0]=='confirm'?"Order confirmed successfully":"Order cancelled successfully";
            toastr.success(msg);
            $('#confirm-modal').modal('hide');
         }

    }
})();