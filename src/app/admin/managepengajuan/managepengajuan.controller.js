(function() {
  'use strict';

  angular
    .module('cell')
    .controller('ManagePengajuanController', ManagePengajuanController);

  /** @ngInject */
  function ManagePengajuanController($timeout, webDevTec, toastr, $q, $log, $scope, $mdDialog, ManagePengajuanService) {
    var vm = this;

    getAllAjuan();

    function getAllAjuan(){
	    vm.pending = [];
	    vm.ditolak = [];
	    vm.diterima = [];
	    ManagePengajuanService.getAllAjuan().then(
	    	function(response){debugger
	    		for(var i = 0; i < response.length; i++){
	    			switch(response[i].status){
	    				case 0 : vm.pending.push(response[i]); break;
	    				case 1 : vm.diterima.push(response[i]); break;
	    				case 2 : vm.ditolak.push(response[i]); break;
	    			}
	    		}
	    	}, function(errResponse) {

	    	})
    }

    vm.updateStatus = function(id, status){
    	ManagePengajuanService.updateStatus({ajuanId: id, statusBaru: status}).then(
    		function(response){
    			getAllAjuan();
    		}, function(errResponse){

    		})
    }

    $scope.ajuan = function(ev, data) {
	    $mdDialog.show({
	      controller: 'DetailPengajuanAdminDialogController',
	      controllerAs: 'detailajuanadmin',
	      templateUrl: 'app/admin/detail/detail-pengajuan-admin-dialog.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      locals:{ajuan: data}
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	  };

  }
})();
