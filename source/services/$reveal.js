angular.module('app').factory('$reveal', function($talk, $state){
  return {
    get: function(revealId){
      return $talk.get('reveal/' + revealId);
    },
    reward: function(revealId){
      return $talk.get('reward/' + revealId);
    }
  };
});
