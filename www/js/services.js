// For pulling APIs

angular.module('starter.services', [])

.factory('Sensors', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var sensors = [{
    id: 1684,
    name: 'Civic Media Table',
    face: 'img/ben.png'
  }];

  return {
    newData: {},

    all: function() {
      return sensors;
    },
    remove: function(sensor) {
      sensors.splice(sensors.indexOf(sensor), 1);
    },
    get: function(sensorId) {
      for (var i = 0; i < sensors.length; i++) {
        if (sensors[i].id === parseInt(sensorId)) {
          return sensors[i];
        }
      }
      return null;
    }
  };
});
