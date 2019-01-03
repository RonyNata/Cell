(function() {
  'use strict';

  angular
    .module('cell')
    .controller('InputController', InputController);

  /** @ngInject */
  function InputController($timeout, webDevTec, toastr, $q, MainService, InputService, $log, $scope, $state) {
    var vm = this;

    // list of `state` value/display objects
    loadAll();
    isLogin();
    vm.selectedItem  = null;
    vm.searchText    = null;
    vm.item = {};
    vm.querySearch   = querySearch;
    vm.item.kodeCellBts = '';
    vm.loginData = {};

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for kecamatan... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      change();
      var results = query ? vm.kecamatan.filter( createFilterFor(query) ) : vm.kecamatan;
      var deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    }

    /**
     * Build `kecamatan` list of key/value pairs
     */
    function loadAll() {
      MainService.GetKecamatan().then(
        function(response){
          vm.kecamatan = response;
        }, function(errResponse){
          console.log(errResponse);
        })
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var uppercaseQuery = query.toUpperCase();

      return function filterFn(state) {
        return (state.namaKecamatan.indexOf(uppercaseQuery) === 0);
      };

    }

    vm.save = function(){
      vm.item.idKecamatan = vm.selectedItem.idKecamatan;
      InputService.CreateDataBTS(vm.item).then(
        function(){
            vm.item.latCellBts = null;
            vm.item.longCellBts = null;
            vm.item.radiusCellBts = null;
          toastr.success('Data Berhasil Disimpan');
          vm.getSuggestNextCode();
        }, function(errResponse){
          $log(errResponse);
        })
    }

    function change(){
      if(!vm.selectedItem){
        vm.item.latitude = null;
        vm.item.longitude = null;
        vm.item.radius = null;
      }
    }

    function convertBTSCodeIntoInt(btsCode) {
        var tempStr = btsCode.slice(4,8);
        return parseInt(tempStr);
    }

    vm.getSuggestNextCode = function() {
        vm.listBts = [];
        MainService.GetBTSByKecamatan(vm.selectedItem.idKecamatan).then(
          function(response){
            vm.listBts = response;
            vm.listBts = vm.listBts.sort( function ( a, b ) { return convertBTSCodeIntoInt(a.kodeCellBts) - convertBTSCodeIntoInt(b.kodeCellBts); } );
            if (response.length > 0) {
                var i;
                var latestBTSCode = convertBTSCodeIntoInt(response[0].kodeCellBts);
                for (i=1;i<response.length;i++) {
                    if (convertBTSCodeIntoInt(response[i].kodeCellBts) > latestBTSCode) {
                        latestBTSCode = convertBTSCodeIntoInt(response[i].kodeCellBts);
                    }
                }
                vm.item.kodeCellBts =
                response[0].kodeCellBts.slice(0,4) + "000".slice(0,3-parseInt(latestBTSCode.toString().length)) + (latestBTSCode+1).toString();

            } else {
                vm.item.kodeCellBts = vm.selectedItem.idKecamatan+"-001";
            }
            pagingList();
          }, function(errResponse){
            $log(errResponse);
          })
    }

    vm.deleteCellBTS = function(selectedCellBts) {
        InputService.deleteCellBTS(selectedCellBts).then(
            function(response) {
                vm.item.latCellBts = null;
                vm.item.longCellBts = null;
                vm.item.radiusCellBts = null;
                vm.getSuggestNextCode();
                toastr.success('Data berhasil dihapus');
            },
            function(errResponse) {
                toastr.error('Data gagal dihapus');
                console.log(errResponse);
            }
        );
    }

    vm.login = function(){
      InputService.Login(vm.loginData).then(
        function(response){
          // if(navigator.cookieEnabled)
          // else sessionStorage.setItem('cred', response.tokenType + ' ' + response.accessToken);
          var token = response.accessToken.split(" ");
          InputService.setCookie('cred', response.tokenType + ' ' + token[1], 30);
          InputService.setCookie('role', token[0]);
          InputService.setCookie('user', vm.loginData.user);

          isLogin();
        }, function(errResponse){
          // var response = {
          //   accessToken: "1 eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTQ1MTkyODk5NDI1IiwiaWF0IjoxNTQ1Mzc4MDYyLCJleHAiOjE1NDU0Mzg1NDJ9.YZt9-FfVpeD7jdv7ghSsoGZkQs5JAT-eyrReQYOpU48gZIb83NJDdjYpXHcj_DRuluk5yFgr7jBuY9w5VQHTSQ",
          //   tokenType: "Bearer"
          // }
          InputService.showToastrFailed(errResponse.data.message);
        })
    }

    vm.logout = function() {
        // if(navigator.cookieEnabled) 
          InputService.deleteCookie();
        // else sessionStorage.removeItem('cred');
        isLogin();
        vm.loginData = {};
        vm.item = {};
    }

    function isLogin(){
      // if(navigator.cookieEnabled) var cred = sessionStorage.getItem('cred');
      if(!navigator.cookieEnabled)
      alert("Terjadi kesalahan, Cookie pada browser anda dalam keadaan mati. Hidupkan cookie terlebih dahulu.");
      var cred = InputService.checkCookie();
      if(InputService.getCookie('role') == "0") $state.go('managepengajuan');
          else $state.go('pengajuan');
    }

    vm.getBTS = function(){
      MainService.GetBTSByKecamatan(vm.selectedItem.idKecamatan).then(
        function(response){
          vm.jumlah = response.length;
          if (response.length > 0) {
              var i;
              var latestBTSCode = convertBTSCodeIntoInt(response[0].kodeCellBts);
              for (i=1;i<response.length;i++) {
                  if (convertBTSCodeIntoInt(response[i].kodeCellBts) > latestBTSCode) {
                      latestBTSCode = convertBTSCodeIntoInt(response[i].kodeCellBts);
                  }
              }
              vm.suggestNextBtsCode =
              response[0].kodeCellBts.slice(0,4) + "000".slice(0,3-parseInt(latestBTSCode.toString().length)) + (latestBTSCode+1).toString();

          }
        }, function(errResponse){
          $log(errResponse);
        })
    }

    vm.getAllBTS = function(){
      MainService.getAllBTS().then(
        function(response){
          vm.dataBTS = response;

        }, function(errResponse){
          $log(errResponse);
        })
    }

    function pagingList(){
        $scope.filteredData = [];
        $scope.currentPageList = 0;
        $scope.numPerPageList = 5;
        $scope.maxSizeList = Math.ceil(vm.listBts.length/$scope.numPerPageList);
        function pageList(){
            $scope.pageList = [];
            for(var i = 0; i < vm.listBts.length/$scope.numPerPageList; i++){
                $scope.pageList.push(i+1);
            }
        }
        pageList();
        $scope.padList = function(i){
            $scope.currentPageList += i;
        }

        $scope.maxList = function(){
            if($scope.currentPageList >= $scope.maxSizeList - 1)
                return true;
            else return false;
        }

        $scope.$watch("currentPageList + numPerPageList", function() {
            var begin = (($scope.currentPageList) * $scope.numPerPageList)
                , end = begin + $scope.numPerPageList;

            $scope.filteredData = vm.listBts.slice(begin, end);
        });
    }
  }
})();
