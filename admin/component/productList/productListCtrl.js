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

    function Controller(toastr, httpService, helperService,uploadImageFile) {
        var vm = this;
        vm.openModal = openModal;
        vm.add = add;
        vm.update = update;
        vm.confirm = confirm;
        vm.prevAndNext = prevAndNext;
        vm.pageNumber = 1;
        vm.confirm = confirm;
        vm.search = null;
        vm.imageNotUploded = true;
        vm.form = {};
        vm.init = init;
        vm.getTheFiles = getTheFiles;

        
        init();

        function init() {

            vm.sendObj = {
                pageNumber: vm.pageNumber
            }
            if (vm.search) {
                vm.sendObj['search'] = vm.search;
            }
            httpService.productList(vm.sendObj).then((objS) => {
                if (objS.responseCode == 200) {
                    // get pagination object data
                    vm.paginationObj = helperService.getPaginationObj(objS.result);
                }
            })
        }

         //find all category
        httpService.allCategoryList().then((objS) => {
            if (objS.responseCode == 200) {
                vm.category = objS.result;
            }
        })


        function openModal(...arg) {
            if (arg[0] == 'add') {
                vm.form = { image:[]};
                vm.modalInfo = arg;
                $('#addEdit-product-modal').modal('show');
            } else if (arg[0] == 'edit') {
                 vm.form = _.clone(arg[1]);
                 vm.form.categoryId = vm.form.categoryId._id;
                 vm.modalInfo = arg;
                $('#addEdit-product-modal').modal('show');
            } else if (arg[0] == 'view') {
                 vm.form = _.clone(arg[1]);
                 vm.form.categoryId = vm.form.categoryId._id;
                 vm.modalInfo = arg;
                $('#view-product-modal').modal('show');
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
                    toastr.success(objS.responseMessage);
                    init();
                }
            })
        }

          function update() {
            vm.sendObj = {
                name: vm.form.name,
                categoryId : vm.form.categoryId,
                image : vm.form.image,
                price : vm.form.price,
                description : vm.form.description
            }
            httpService.editProduct(vm.form._id, vm.sendObj).then((objS) => {
                if (objS.responseCode == 200) {
                    $('#addEdit-product-modal').modal('hide');
                    toastr.success(objS.responseMessage);
                    init();
                }
            })
        }

        // delete category function
        function confirm() {
            httpService.deleteProduct(vm.modalInfo[1]).then((objS) => {
                $('#confirm-modal').modal('hide');
                toastr.success(objS.responseMessage)
                objS.responseCode == 200 ? init() : '';
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

        function getTheFiles($files) {
            vm.imageUploading = true;
            vm.returnData = helperService.appendFileInFormData($files);
            //Get html data bases of id
            vm.imageDivHtml = document.getElementById("product-image");
            // set selected image path in image src
            vm.imageDivHtml.src = vm.returnData[1]
            // call upload service
            uploadImageFile.upload(vm.returnData[0]).then((objS) => {
                if (objS.data.responseCode == 200) {
                    vm.form['image'] = objS.data.result;
                    vm.imageUploading = false;
                    vm.imageNotUploded = false;
                }
            })
        };
     
    }
})();