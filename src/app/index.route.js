(function() {
  'use strict';

  angular
    .module('cell')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
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
        controllerAs: 'managepengajuan'
      })
      .state('managetower', {
        url: '/manage-tower',
        templateUrl: 'app/admin/managetower/managetower.html',
        controller: 'ManageTowerController',
        controllerAs: 'managetower'
      })
      .state('pengajuan', {
        url: '/pengajuan',
        templateUrl: 'app/client/pengajuan/pengajuan.html',
        controller: 'PengajuanController',
        controllerAs: 'pengajuan'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
