(function(){
	'use strict';

	angular.module('cell').service('ManageTowerService', ManageTowerService);

	function ManageTowerService(API, $http, $q, toastr){
		var service = {};

		service.CreateDataBTS = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-cell-bts/', data, {
                headers: {
                    'Authorization': service.getCookie("cred")
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
            $http.post(API + 'login-secure/', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic QWRtaW46YWRtaW4='
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

        service.showToastrFailed = function(message){
            toastr.error(message);
        }

        service.deleteCellBTS = function(idCellBts) {
            var deferred = $q.defer();
            $http.delete(API + 'delete-bts/'+idCellBts, {
                headers: {
                    'Authorization': service.getCookie("cred")
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

        service.setCookie = function (cname,cvalue,exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        service.getCookie = function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        service.checkCookie = function () {
            var user=service.getCookie("cred");
            if (user != "") {
                return true;
            } else {
               return false;
            }
        }

        service.deleteCookie = function(){
            service.setCookie('cred','',30);
        }

        return service;
	}
})();

// (function(){
//     'use strict';

//     angular.module('cell').service('ManagePengajuanService', ManagePengajuanService);

//     function ManagePengajuanService(API, $http, $q, toastr, InputService){
//         var service = {};

//         service.getAllAjuan = function () {
//             var deferred = $q.defer();
//             $http.get(API + 'get-all-ajuan/', {
//                 headers: {
//                     'Authorization': InputService.getCookie("cred")
//                 }
//             }).then(
//                 function (response){
//                     deferred.resolve(response.data);
//                 },
//                 function(errResponse){
//                     deferred.reject(errResponse);
//                 }
//             );
//             return deferred.promise;
//         };

//         service.updateStatus = function (data) {
//             var deferred = $q.defer();
//             $http.post(API + 'update-status-ajuan/', data,{
//                 headers: {
//                     'Authorization': InputService.getCookie("cred")
//                 }
//             }).then(
//                 function (response){
//                     deferred.resolve(response.data);
//                 },
//                 function(errResponse){
//                     deferred.reject(errResponse);
//                 }
//             );
//             return deferred.promise;
//         };

//         return service;
//     }
// })();
