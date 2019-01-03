(function(){
	'use strict';

	angular.module('cell').service('ManagePengajuanService', ManagePengajuanService);

	function ManagePengajuanService(API, $http, $q, toastr, InputService){
		var service = {};

		service.getAllAjuan = function () {
            var deferred = $q.defer();
            $http.get(API + 'get-all-ajuan/', {
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

        service.updateStatus = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'update-status-ajuan/', data,{
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
