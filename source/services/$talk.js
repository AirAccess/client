angular.module('app').factory('$talk', function($http, $state){
  var apiUrl = '/api/';
  var errorHandler = function(response){
     if(response.status === 401 && !$state.is('login') && !$state.is('register')){
       return $state.go('login');
     }
     throw response.data;
  };

  var inputHandler = (response) => {
    return response.data;
  }

  return {
    get: function(url, headers){
      if(!headers){
        headers = {};
      }
      headers.withCredentials = true;
      return $http.get(apiUrl+url, headers).catch(errorHandler).then(inputHandler)
    },

    post: function(url, body, headers){
      if(!headers){
        headers = {};
      }
      headers.withCredentials = true;
      return $http.post(apiUrl+url, body, headers).catch(errorHandler).then(inputHandler)
    }
  };
});
