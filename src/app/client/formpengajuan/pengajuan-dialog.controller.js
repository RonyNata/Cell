(function() {
  'use strict';

  angular
    .module('cell')
    .controller('PengajuanDialogController', PengajuanDialogController);

  /** @ngInject */
  function PengajuanDialogController($timeout, webDevTec, toastr, $q, $log, $scope, $mdDialog, 
  	MainService, InputService, PengajuanService) {
    var vm = this;

    loadAll();
    vm.selectedItem  = null;
    vm.searchText    = null;
    vm.latitude      = null;
    vm.longitude     = null;
    vm.querySearch   = querySearch;
    vm.item = {};

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
        function(response){debugger
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

	function change(){
      if(!vm.selectedItem){
        vm.latitude = null;
        vm.longitude = null;
        vm.inRange = undefined;
      }
    }

    $scope.uploadNpwpd = function(files) {
        console.log(files[0].name);
        vm.namaFileNpwpd = files[0].name;
        // vm.extension = vm.namaFile.split('.');
        // vm.extension = vm.extension[vm.extension.length - 1];
        vm.fileNpwpd = files[0];
    }

    $scope.uploadDok = function(files) {
        console.log(files[0].name);
        vm.namaFileDok = files[0].name;
        // vm.extension = vm.data.namaFile.split('.');
        // vm.extension = vm.extension[vm.extension.length - 1];
        vm.fileDok = files[0];
    } 

    vm.save = function(){
    	vm.item.userId = InputService.getCookie('user');
    	vm.item.idKecamatan = vm.selectedItem.idKecamatan;
    	vm.item.kecamatan = vm.selectedItem.namaKecamatan;
    	vm.item.namaFileNpwpd = vm.namaFileNpwpd;
    	vm.item.namaFileDok = vm.namaFileDok;
    	// console.log(vm.item);
    	PengajuanService.saveAjuan(vm.item).then(
    		function(response){
    			toastr.success('Permohonan berhasil diajukan');
    			$mdDialog.hide();
    		}, function(errResponse){
    			toastr.error('Permohonan gagal diajukan');
    		})
    }
    
  }
})();
