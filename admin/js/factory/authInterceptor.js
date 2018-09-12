(function() {
    'use strict';
    app.factory('AuthInterceptor', factory);

    function factory($window, $q, $location, toastr, $rootScope) {
        return {
            request: function(config) {
                // console.log(config)
                config.headers = config.headers || {};
                $rootScope.isRequesting = true;
                if ($window.localStorage.getItem('authtoken')) {
                    // may also use sessionStorage
                    config.headers.authtoken = $window.localStorage.getItem('authtoken');
                } else {
                    $location.path('/login');
                }
                return config || $q.when(config);
            },
            response: function(response) {
                //console.log(response)
                $rootScope.isRequesting = false;
                if (response.status === 200) {
                    if (response.data.responseCode == 403) {
                        $location.path('/login');
                    } else if (response.data.responseCode == 404 || response.data.responseCode == 500 || response.data.responseCode == 400 || response.data.responseCode == 422) {
                        toastr.error(response.data.responseMessage);
                    }
                }
                return response || $q.when(response);
            }
        };
    }
})();