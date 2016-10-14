(function(){
  angular
    .module('todo', ['ui.router'])
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
      controller: 'AuthCtrl',
      controllerAs: 'auth'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/partials/signup.html',
      controller: 'AuthCtrl',
      controllerAs: 'auth'
    })
    .state('addTodo', {
      url: '/todos/new',
      templateUrl: '/partials/todos/new.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .state('editTodo', {
      url: '/todos/edit',
      params: {
        todo: null
      },
      templateUrl: '/partials/todos/edit.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .state('allTodos', {
      url: '/todos',
      templateUrl: '/partials/todos/index.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })


  }
})()
