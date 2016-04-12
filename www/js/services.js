// For pulling APIs

angular.module('starter.services', [])

.factory('Sensors', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var sensors = [
    {
      id: 3146,
      name: 'MIT Media Lab'
    },
    {
      id: 3229,
      name: 'Seaport'
    },
    {
      id: 1684,
      name: 'Chelsea'
    }
  ];

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
    currentImage: {}, // Set to blank object

    addImage: function(image){
      this.images.push(image);
      localStorage['images'] = JSON.stringify(this.images);
    },

    removeImage: function(image){
      this.images.splice(this.images.indexOf(image), 1);
    },

    setHumidityLevel: function(image){
      var value = image.data.sensors[2].value;
      if(value > 60){
        return 1;
      } else if(value > 40){
        return 2;
      } else {
        return 3;
      }
    },

    setTempLevel: function(image){
      var value = image.data.sensors[3].value,
      color, opacity;

      console.log(value);

      if (value > 19){
        color = "red";
        opacity = value / 35 - .3;
      } else if (value > 10){
        color = "#0391db";
        opacity = .2;
      } else {
        color = "#0391db";
        opacity = .4;
      }

      return "background-color:" + color + ";opacity:" + opacity + ";";
    }
  }
});
