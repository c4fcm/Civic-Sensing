// For pulling APIs

angular.module('starter.services', [])

.factory('Sensors', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var sensors = [{
    id: 0,
    name: 'Civic Media Table',
    face: 'img/ben.png'
  }];

  return {
    all: function() {
      return sensors;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
