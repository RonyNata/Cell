(function() {
  'use strict';

  angular
    .module('cell')
    .controller('InputController', InputController);

  /** @ngInject */
  function InputController($timeout, webDevTec, toastr, $q, MainService, InputService, $log) {
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
          sessionStorage.setItem('cred', response.tokenType + ' ' + response.accessToken);
          isLogin();
        }, function(errResponse){
          InputService.showToastrFailed(errResponse.data.message);
        })
    }

    vm.logout = function() {
        sessionStorage.removeItem('cred');
        isLogin();
        vm.loginData = {};
        vm.item = {};
    }

    function isLogin(){
      var cred = sessionStorage.getItem('cred');
      if(cred != undefined) vm.isLogin = true;
      else vm.isLogin = false;
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
  }
})();
