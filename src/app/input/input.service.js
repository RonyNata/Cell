(function(){
	'use strict';

	angular.module('cell').service('InputService', InputService);

	function InputService(API, $http, $q, toastr){
		var service = {};

		service.CreateDataBTS = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-cell-bts/', data, {
                headers: {
                    'Authorization': sessionStorage.getItem('cred')
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

        service.GetBTSByKecamatan = function (idKecamatan) {
            var deferred = $q.defer();
            $http.get(API + 'cell-bts/' + idKecamatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetAllBTS = function () {
            var deferred = $q.defer();
            $http.get(API + 'cell-bts/').then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.Login = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'login-secure/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.showToastrFailed = function(message){
            toastr.error(message);
        }

		service.deleteCellBTS = function(idCellBts) {
			var deferred = $q.defer();
			$http.delete(API + 'delete-bts/'+idCellBts, {
                headers: {
                    'Authorization': sessionStorage.getItem('cred')
                }
            }).then(
				function (response) {
					deferred.resolve(response.data);
				},
				function (errResponse) {
					deferred.reject(errResponse);
				}
			);
			return deferred.promise;
		}

        return service;
	}
})();
