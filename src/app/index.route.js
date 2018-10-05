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
        url: '/input',
        templateUrl: 'app/input/input.html',
        controller: 'InputController',
        controllerAs: 'input'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
