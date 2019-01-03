(function(){
	'use strict';

	angular.module('cell').service('RegistrasiService', RegistrasiService);

	function RegistrasiService(API, $http, $q, toastr){
		var service = {};

		service.Registrasi = function (data) {console.log(data)
            var deferred = $q.defer();
            $http.post(API + 'register-user/', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic QWRtaW46QWRtaW4='
                }
            }).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        return service;
	}
})();
