angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http, $state, Gallery) {
  $scope.currentImage = {};

  $scope.takePicture = function(){
    
    var onSuccess = function(imageURI){
      var image = {
        URI: imageURI
      };
      $scope.tagImage(3146, image);
    };

    var onError = function(){
      console.log("Image capture failed.");
    };

    navigator.camera.getPicture(onSuccess, onError, {
      limit: 1,
      quality: 75,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      correctOrientation: true,
      cameraDirection: 1
    });
  };

  $scope.tagImage = function(sensorId, image){
    $http.get("https://api.smartcitizen.me/devices/" + sensorId)
      .success(function(response){
        image.timestamp = new Date().getTime();
        image.data = response.data;
        Gallery.addImage(image);
        Gallery.currentImage = image;
        $state.go('edit');
      });
  };
})

.controller('SensorsCtrl', function($scope, Sensors) {
  $scope.sensors = Sensors.all();
})

.controller('SensorDetailCtrl', function($scope, $stateParams, $http, Sensors) {
  $scope.sensor = Sensors.find($stateParams.sensorId);
  Sensors.getLatestReadings($scope.sensor.id, $scope.sensor);

  $scope.getSensorId = function(sensorName){
    for(i=0;i<$scope.sensor.response.data.sensors.length;i++){
      console.log($scope.sensor.response.data.sensors[i][name] == sensorName);
      return $scope.sensor.response.data.sensors[i][name] == sensorName;
    }
  };
})

.controller('ImagesCtrl', function($scope, Gallery, $filter) {
  $scope.images = Gallery.images.reverse();
  console.log($scope.images);

  $scope.remove = function(image){
    Gallery.removeImage(image);
    $scope.images = Gallery.images.reverse();
  }
})

.controller('EditCtrl', function($scope, Gallery, $http){
  $scope.soundBars = new Array(18);
  $scope.image = Gallery.images[0]; // Change!

  $scope.image.activeFilter = "sound";

  $scope.applyFilter = function(sensorName){
    $scope.image.activeFilter = sensorName;
  };

  $scope.setHumidityLevel = function(){
    var value = $scope.image.data.sensors[2].value;
    if(value > 60){
      return 1;
    } else if(value > 40){
      return 2;
    } else {
      return 3;
    }
  };

  $scope.setTempLevel = function(){
    var value = $scope.image.data.sensors[3].value,
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

  $scope.humidityLevel = $scope.setHumidityLevel();
  $scope.tempLevel = $scope.setTempLevel();
  console.log($scope.tempLevel);

});
