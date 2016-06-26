angular.module('GestorDeViagens')
  .config(function($routeProvider){
    $routeProvider.when('/home', {
      templateUrl: 'templates/home.html',
      // controller: 'ImoveisIndexController',
      // controllerAs: 'indexController'
    })
    .when('/destinos', {
      templateUrl: 'templates/destinos.html',
      // controller: 'ImoveisExibirController',
      // controllerAs: 'exibir'
    })
    .when('/gastos', {
      templateUrl: 'templates/gastos.html'
    })
    // .when('/', {
    //   // templateUrl: 'templates/pages/imoveis/index.html'
    // })
    .otherwise({
      redirectTo: '/home'
    });

  });