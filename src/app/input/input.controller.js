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
    vm.selectedItem  = null;
    vm.searchText    = null;
    vm.item = {};
    vm.querySearch   = querySearch;

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
          $log(errResponse);
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
          toastr.success('Data Berhasil Disimpan');
          vm.getBTS();
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

    vm.getBTS = function(){
      MainService.GetBTSByKecamatan(vm.selectedItem.idKecamatan).then(
        function(response){
          vm.jumlah = response.length;
        }, function(errResponse){
          $log(errResponse);
        })
    }
  }
})();
