(function(){
  var app = angular.module('todo')

  app.controller('MainCtrl', function($http, $state)  {
      var self = this;

      $http.get('/todos')
        .then(function(response) {
          self.todos = response.data.todos;
        })
        .catch((err) => {
          console.log('err',err);
        });

      this.editedTodo = null;


      function setTodoToEdit(todo) {
        this.editedTodo = todo;
      }

      function reset(todo) {
        this.isCreating = false;
        this.isEditing = false;
      }

      // CRUD LOGIC
      // ==============================
      function addTodo(newTodo) {
        $http.post('/todos', newTodo)
          .then(function(response) {
            newTodo.description = '';
            $state.go('allTodos', {url: '/todos'})
          })
          .catch((err) => {
            console.log(err);
          });
      }

      function deleteTodo(id) {
        $http.delete(`/todos/${id}`)
          .then(function(response) {
            console.log(response);
            self.todos = response.data.todos;
          })
      }

      function editTodo(todo) {
        $http.put(`/todos/${$state.params.todo._id}`, todo)
          .then(function(response){
            console.log(response);
            
            $state.go('allTodos', {url: '/todos'})
          })

        this.isEditing = false;
      }

      // PUBLIC METHODS
      this.addTodo = addTodo;
      this.deleteTodo = deleteTodo;
      this.setTodoToEdit = setTodoToEdit;
      this.editTodo = editTodo;
      this.reset = reset;
    })


    app.controller('AuthCtrl', function($http, $state, $stateParams)  {
      var self = this;

      function login(userPass) {
        $http.post('/users/login', {username: userPass.username, password: userPass.password})
          .then(function(response) {
            self.user = response.data.user

            $state.go('index', {url: '/', user: response.data.user})
          })
          .catch((err) => {
            console.log(err);
          });
      }

      function signup(userPass) {
        $http.post('/users/signup', {username: userPass.username, password: userPass.password})
          .then(function(response) {
            console.log(response)

            $state.go('login', {url: '/login'})
          })
          .catch((err) => {
            console.log(err);
          });
      }

      function logout(userPass) {
        $http.delete('/users/logout')
        .then(function(response) {
          $state.go('index', {url: '/'})
        })
        .catch((err) => {
          console.log(err);
        });
      }

      this.login = login;
      this.signup = signup;
      this.logout = logout;
    })
  })();
