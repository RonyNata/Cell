/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('cell')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('API', 'http://10.2.1.32:8989/');

})();
