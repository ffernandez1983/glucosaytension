angular.module('starter.services', ['ngCordova'])

.controller('SaveCtrlG', function ($scope, $cordovaSQLite){

  $scope.datos=0;
  $scope.fecha=new Date();
  $scope.save=function(datos, fecha){


    $cordovaSQLite.execute(db, "INSERT INTO Medidas (glucosa, tension, fecha) VALUES (?, 0, ?)", [datos],[fecha]);

  };

  $scope.mas=function(){

    var numero = $scope.datos
    var masuno=numero+1;
    $scope.datos=masuno;

 };

 $scope.menos=function(){
  var numero=$scope.datos;

   if(numero>0)
    {
      var menosuno=numero-1;
      $scope.datos=menosuno;

    };

  };

})

.controller('SaveCtrlT', function ($scope, $cordovaSQLite){

  $scope.datos=0;

  $scope.save=function(datos){

    $cordovaSQLite.execute(db, "INSERT INTO Medidas (glucosa, tension) VALUES (0, ?)", [datos]);

  };


  $scope.mas=function(){

    var numero = $scope.datos
    var masuno=numero+1;
    $scope.datos=masuno;

 };

 $scope.menos=function(){
  var numero=$scope.datos;

   if(numero>0)
    {
      var menosuno=numero-1;
      $scope.datos=menosuno;

    };

  };

})

.controller('LoadCtrlG', function ($scope, $cordovaSQLite, $http){
  $scope.resultados=[];

  $cordovaSQLite.execute(db, "SELECT * FROM Medidas WHERE tension=0")
    .then(

      function(result){
        cantidad=result.rows.length;
        for(i=0;i<cantidad;i++){
          var dato=result.rows[i];
          $scope.resultados.push(dato);
       }

      });
  $scope.enviar=function(){
      var conAjax = $http.post("recibe.php", {uno: 1,dos: 2});
      conAjax.success(function(respuesta){
      console.log(respuesta);
  });

  };
})

.controller('LoadCtrlT', function ($scope, $cordovaSQLite, $http){
  $scope.resultados=[];

  $cordovaSQLite.execute(db, "SELECT * FROM Medidas WHERE glucosa=0")
    .then(

      function(result){
        cantidad=result.rows.length;
        for(i=0;i<cantidad;i++){
          var dato=result.rows[i];
          $scope.resultados.push(dato);
       }

      });
  $scope.enviar=function(){
      var conAjax = $http.post("recibe.php", {uno: 1,dos: 2});
      conAjax.success(function(respuesta){
      console.log(respuesta);
  });

  };
});



/*
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
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
*/
