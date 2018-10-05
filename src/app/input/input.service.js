(function(){
	'use strict';

	angular.module('cell').service('InputService', InputService);

	function InputService(API, $http, $q){
		var service = {};

		service.CreateDataBTS = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-cell-bts/', data).then(
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

        return service;
	}
})();