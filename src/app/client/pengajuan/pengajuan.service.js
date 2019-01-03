(function(){
	'use strict';

	angular.module('cell').service('PengajuanService', PengajuanService);

	function PengajuanService(API, $http, $q, toastr, InputService){
		var service = {};

		service.getAjuanById = function (id) {
            var deferred = $q.defer();
            $http.get(API + 'get-ajuan-history/'+id, {
                headers: {
                    'Authorization': InputService.getCookie("cred")
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

        service.saveAjuan = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-ajuan/', data, {
                headers: {
                    'Authorization': InputService.getCookie("cred")
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
