(function() {
  'use strict';

  angular
    .module('cell')
    .controller('ManagePengajuanController', ManagePengajuanController);

  /** @ngInject */
  function ManagePengajuanController($timeout, webDevTec, toastr, $q, $log, $scope, $mdDialog) {
    var vm = this;

    $scope.ajuan = function(ev) {
	    $mdDialog.show({
	      controller: 'DetailPengajuanAdminDialogController',
	      templateUrl: 'app/admin/detail/detail-pengajuan-admin-dialog.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	  };

  }
})();
