(function() {
    'use strict';
    app.service('httpService', Service);

    function Service($http, $q) {
        var service = {};
        service.login = login;
        service.addCategory = addCategory;
        service.editCategory = editCategory;
        service.deleteCategory = deleteCategory;
        service.categoryList = categoryList;
        service.userList = userList;
        service.allCategoryList = allCategoryList;

        service.addProduct = addProduct;
        service.productList = productList;
        service.editProduct = editProduct;
        service.deleteProduct = deleteProduct;
        service.enquiryList = enquiryList;
        service.enquiry = enquiry;


        return service;


        function login(data) {
            return $http.post('/admin/login', data).then(handleSuccess, handleError);
        }

        function addCategory(data) {
            return $http.post('/admin/addCategory', data).then(handleSuccess, handleError);
        }

        function editCategory(categoryId, data) {
            return $http.put('/admin/updateCategory/' + categoryId, data).then(handleSuccess, handleError);
        }

        function deleteCategory(categoryId) {
            return $http.put('/admin/deleteCategory/' + categoryId).then(handleSuccess, handleError);
        }

        function categoryList(data) {
            return $http.post('/admin/categoryList', data).then(handleSuccess, handleError);
        }

        function userList(data) {
            return $http.post('/admin/userList', data).then(handleSuccess, handleError);
        }


        function addProduct(data) {
            return $http.post('/admin/addProduct', data).then(handleSuccess, handleError);
        }

        function editProduct(productId, data) {
            return $http.put('/admin/updateProduct/' + productId, data).then(handleSuccess, handleError)
        }

        function allCategoryList() {
            return $http.get('/admin/allCategoryList').then(handleSuccess, handleError)
        }

        function productList(data) {
            return $http.post('/admin/productList', data).then(handleSuccess, handleError);
        }

        function deleteProduct(productId) {
            return $http.put('/admin/deleteProduct/' + productId).then(handleSuccess, handleError);
        }


        function enquiry(data) {
            return $http.post('/admin/enquiry', data).then(handleSuccess, handleError);
        }

        function enquiryList(data) {
            return $http.post('/admin/enquiryList', data).then(handleSuccess, handleError);
        }


        //===========================// 
        // private functions
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
        //===========================//
    }


    app.service('uploadImageFile', function($http, $q) {
        this.upload = function(fd) {
            var deferred = $q.defer();
            console.log(fd)
            $http.post('/admin/uploadImage', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function(objS) {
                deferred.resolve(objS);
            }, function(objE) {
                deferred.reject("server Error");
            });
            return deferred.promise;
        }
    })

})();