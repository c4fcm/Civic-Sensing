// For pulling APIs

angular.module('starter.services', [])

.factory('Sensors', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var sensors = [{
    id: 3146,
    name: 'Civic Media Table'
  }];

  return {

    all: function(){
      return sensors;
    },

    remove: function(sensor){
      sensors.splice(sensors.indexOf(sensor), 1);
    },

    find: function(sensorId){
      for (var i = 0; i < sensors.length; i++) {
        if (sensors[i].id === parseInt(sensorId)) {
          return sensors[i];
        }
      }
      return null;
    },

    getLatestReadings: function(sensorId, storageObject){
      $http.get("https://api.smartcitizen.me/devices/" + sensorId)
        .success(function(response){
          storageObject.response = response;
          console.log(storageObject);
        });
    }
  };
})

.factory('Gallery', function($http) {
  localStorage['images'] = localStorage['images'] || '[]';
  var images = JSON.parse(localStorage['images'])

  return {
    images: images,
    currentImage: images[0], // Set to blank object

    addImage: function(image){
      this.images.push(image);
      localStorage['images'] = JSON.stringify(this.images);
    },

    removeImage: function(image){
      this.images.splice(this.images.indexOf(image), 1);
    }
  }

});
