(function(){
  angular
    .module('todo', ['ui.router', 'ngCookies'])
    .config(AuthRouter);

  function AuthRouter($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/index");

    $stateProvider
    .state('index', {
      url: '/index',
      params: {
        user: null
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: '/partials/login.html',
      // controller: 'AuthCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html'
    })


  }
})()
