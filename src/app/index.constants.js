/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('cell')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('API', 'http://localhost:8989/');

})();
