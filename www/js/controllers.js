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

.controller('GalleryCtrl', function($scope, Gallery, $filter) {
  $scope.images = Gallery.images.reverse();
  $scope.soundBars = new Array(18);

  $scope.remove = function(image){
    Gallery.removeImage(image);
    $scope.images = Gallery.images.reverse();
  }
})

.controller('EditCtrl', function($scope, Gallery, $http, $state){
  $scope.soundBars = new Array(18);
  $scope.image = Gallery.currentImage; // Change!

  $scope.image.activeFilter = "sound";

  $scope.applyFilter = function(sensorName){
    $scope.image.activeFilter = sensorName;
  };

  $scope.shareImage = function(){
    Gallery.currentImage = $scope.image;
    $state.go('share');
  };

  $scope.image.humidityLevel = Gallery.setHumidityLevel($scope.image);
  $scope.image.tempLevel = Gallery.setTempLevel($scope.image);
})

.controller('ShareCtrl', function($scope, Gallery, $http, $state){
  $scope.image = Gallery.currentImage;
  $scope.soundBars = new Array(18);

  $scope.goBack = function(){
    $state.go('edit');
  };

  $scope.next = function(){
    $state.go('tab.gallery');
  };

  $scope.shareFB = function(){
    var message = $scope.image.caption;
    var image = $scope.image.URI;
    var link = "http://civic.mit.edu";

    var success = function(){
      console.log("success");
    };
    var error = function(){
      console.log("fail");
    };

    // window.plugins.socialsharing
    //   .shareViaFacebook(message, image, link, success, error);

    window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
  };

  $scope.shareTwitter = function(){
    var message = "Testing share";

    window.plugins.socialsharing
      .share(message);
  };

});
