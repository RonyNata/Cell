(function() {
  'use strict';

  angular
    .module('cell')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('input', {
        url: '/login',
        templateUrl: 'app/input/input.html',
        controller: 'InputController',
        controllerAs: 'input'
      })
      .state('registrasi', {
        url: '/registrasi',
        templateUrl: 'app/registrasi/registrasi.html',
        controller: 'RegistrasiController',
        controllerAs: 'registrasi'
      })
      .state('managepengajuan', {
        url: '/manage-pengajuan',
        templateUrl: 'app/admin/managepengajuan/managepengajuan.html',
        controller: 'ManagePengajuanController',
        controllerAs: 'managepengajuan',
        resolve:{
          reload: function(){
            if(getCookie("role") != '0')
              $state.go('pengajuan');
          }
        }
      })
      .state('managetower', {
        url: '/manage-tower',
        templateUrl: 'app/admin/managetower/managetower.html',
        controller: 'ManageTowerController',
        controllerAs: 'managetower',
        resolve:{
          reload: function(){
            if(getCookie("role") != '0')
              $state.go('pengajuan');
          }
        }
      })
      .state('pengajuan', {
        url: '/pengajuan',
        templateUrl: 'app/client/pengajuan/pengajuan.html',
        controller: 'PengajuanController',
        controllerAs: 'pengajuan',
        resolve:{
          reload: function(){
            if(getCookie("role") != '1')
              $state.go('managepengajuan');
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
