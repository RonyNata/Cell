(function(){
	'use strict';

	angular.module('cell').service('PengajuanService', PengajuanService);

	function PengajuanService(API, $http, $q, toastr){
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

        return service;
	}
})();
