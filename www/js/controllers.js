angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http, $state, Gallery) {
  $scope.currentImage = {};

  $scope.takePicture = function(){
    
    var onSuccess = function(imageURI){
      $scope.currentImage.URI = imageURI;
      $scope.tagImage(3146, $scope.currentImage);
    };

    var onError = function(){
      console.log("Image capture failed.");
    };

    navigator.camera.getPicture(onSuccess, onError, {
      limit: 1,
      quality: 75,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      correctOrientation: true
    });
  };

  $scope.tagImage = function(sensorId, image){
    $http.get("https://api.smartcitizen.me/devices/" + sensorId)
      .success(function(response){
        image.data = response.data;
        Gallery.addImage(image);
        $state.go('tab.gallery');
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

.controller('GalleryCtrl', function($scope, Gallery) {
  $scope.images = Gallery.images.reverse();
  console.log($scope.images);
})

.controller('GalleryDetailCtrl', function($scope){
});
