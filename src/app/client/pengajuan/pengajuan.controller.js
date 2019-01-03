(function() {
  'use strict';

  angular
    .module('cell')
    .controller('PengajuanController', PengajuanController);

  /** @ngInject */
  function PengajuanController($timeout, webDevTec, toastr, $q, $log, $scope, $mdDialog, PengajuanService, InputService) {
    var vm = this;

    getAllAjuan();

    function getAllAjuan(){
	    vm.pending = [];
	    vm.ditolak = [];
	    vm.diterima = [];
	    PengajuanService.getAjuanById(InputService.getCookie('user')).then(
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

    $scope.ajuan = function(ev) {
	    $mdDialog.show({
	      controller: 'PengajuanDialogController',
	      controllerAs: 'pengajuandialog',
	      templateUrl: 'app/client/formpengajuan/pengajuan-dialog.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
	    .then(function(answer) {
	      getAllAjuan();
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	  };
    
  }
})();
