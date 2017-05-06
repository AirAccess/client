angular.module('app').factory('$code', function($talk, $state){
  return {
    lookup: function(code){
      return $talk.get('lookup/'+code);
    },
    reveal: function(name, email, code){
      return $talk.post('reveal', {name: name, email: email, code: code});
    }
  };
});
