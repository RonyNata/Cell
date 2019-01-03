(function() {
  'use strict';

  angular
    .module('cell')
    .controller('DetailPengajuanAdminDialogController', DetailPengajuanAdminController);

  /** @ngInject */
  function DetailPengajuanAdminController($timeout, webDevTec, toastr, $q, $log, $scope, $mdDialog, ajuan) {
    var vm = this;
    vm.ajuan = ajuan;
    
    $scope.back = function(){
    	$mdDialog.hide();
    }
    
  }
})();
