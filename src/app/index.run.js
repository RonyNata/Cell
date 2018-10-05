(function() {
  'use strict';

  angular
    .module('cell')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
