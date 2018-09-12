(function() {
    'use strict';
    app.service('httpService', Service);

    function Service($http, $q) {
        var service = {};
        service.login = login;


        return service;


        function login(data) {
            return $http.post('/admin/login', data).then(handleSuccess, handleError);
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