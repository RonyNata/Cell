(function() {
  'use strict';

  angular
    .module('cell')
    .controller('RegistrasiController', RegistrasiController);

  /** @ngInject */
  function RegistrasiController($timeout, webDevTec, toastr, $q, $log, $scope, RegistrasiService) {
    var vm = this;

    vm.item = {};

    vm.save = function(){
    	RegistrasiService.Registrasi(vm.item).then(
    		function(response){
    			vm.status = true;
    		}, function(errResponse){
    			vm.status = false;
    		})
    }
    
  }
})();
