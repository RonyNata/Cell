(function() {
  'use strict';

  angular
    .module('cell')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $q, MainService, $log, API, $window) {
    var vm = this;

    // list of `state` value/display objects
    loadAll();
    vm.selectedItem  = null;
    vm.searchText    = null;
    vm.latitude      = null;
    vm.longitude     = null;
    vm.querySearch   = querySearch;
    vm.path          = API + 'get-dokumen-permohonan';
    mapboxgl.accessToken = 'pk.eyJ1IjoibmF0YWJha2EiLCJhIjoiY2pteWppbm14MWVhZTN3cnVqZWRvcGdhZiJ9.ZEPMCBHqlRUPtHnKWYoWJQ';
    var coordinates = document.getElementById('coordinates');
    changeCoordinates(-6.2884815, 107.119828, true);

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for kecamatan... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      change();
      var results = query ? vm.kecamatan.filter( createFilterFor(query) ) : vm.kecamatan;
      var deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    }

    /**
     * Build `kecamatan` list of key/value pairs
     */
    function loadAll() {
      MainService.GetKecamatan().then(
        function(response){
          vm.kecamatan = response;
        }, function(errResponse){
          $log(errResponse);
        })
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var uppercaseQuery = query.toUpperCase();

      return function filterFn(state) {
        return (state.namaKecamatan.indexOf(uppercaseQuery) === 0);
      };

    }

    function change(){
      if(!vm.selectedItem){
        vm.latitude = null;
        vm.longitude = null;
        vm.inRange = undefined;
      }
    }

    vm.isInRangeRadius = function(){
      if(vm.latitude && vm.longitude && vm.selectedItem)
      MainService.GetBTSByKecamatan(vm.selectedItem.idKecamatan).then(
        function(response){
          var dist = 0;
          for(var i = 0; i<response.length; i++){
            // myMap();
            dist = distance(response[i].latCellBts, response[i].longCellBts, vm.latitude, vm.longitude,"K");
            dist *= 1000;
            if(dist < response[i].radiusCellBts) {
              vm.inRange = true;
              vm.dist = dist;
              break;
            }
            else vm.inRange = false;
              vm.dist = dist;
          }
        }, function(errResponse){
          $log(errResponse);
        })
    }

    function distance(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }


    vm.change = function(){
      if(vm.latitude != undefined && vm.longitude != undefined)
        changeCoordinates(vm.latitude, vm.longitude, false);
    }

    vm.reset = function(){
      vm.latitude = null;
      vm.longitude = null;
      vm.inRange = null;
      vm.selectedItem = null;
      changeCoordinates(-6.2884815, 107.119828, true);
    }

    function changeCoordinates(lat,long, isDefault){
      var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [long, lat],
          zoom: 9.2
      });

      if(!isDefault) createMarker(map, lat, long);
    }

    function createMarker(map, lat, long){
      var marker = new mapboxgl.Marker({
          draggable: true
      })
          .setLngLat([long, lat])
          .addTo(map);

      function onDragEnd() {
          var lngLat = marker.getLngLat();
          coordinates.style.display = 'block';
          coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
          vm.latitude = lngLat.lat;
          vm.longitude = lngLat.lng;
      }

      marker.on('drag', onDragEnd);
    }

    vm.getDocument = function(){
      $window.location.href = vm.path;
    }
  }
})();
