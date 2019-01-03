(function() {
  'use strict';

  angular
    .module('cell')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, InputService, $state) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();

      function isLogin(){
        // if(navigator.cookieEnabled) var cred = sessionStorage.getItem('cred');
        if(!navigator.cookieEnabled)
        alert("Terjadi kesalahan, Cookie pada browser anda dalam keadaan mati. Hidupkan cookie terlebih dahulu.");
        var cred = InputService.checkCookie();
        if(cred) {
          if(InputService.getCookie("role") != '0') $state.go('managepengajuan');
            else $state.go('pengajuan');
        } else $state.go('input');
      }

      vm.logout = function() {
          // if(navigator.cookieEnabled) 
            InputService.deleteCookie();
          // else sessionStorage.removeItem('cred');
          isLogin();
          vm.loginData = {};
          vm.item = {};
      }
    }
  }

})();
