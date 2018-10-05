(function(){
	'use strict';

	angular.module('cell').service('MainService', MainService);

	function MainService(API, $http, $q){
		var service = {};

		service.GetKecamatan = function () {
            var deferred = $q.defer();
            $http.get(API + 'kecamatan/').then(
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