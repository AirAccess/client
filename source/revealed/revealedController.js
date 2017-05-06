angular.module('app').controller('revealedController', function($scope, $code, $state, $stateParams, $user) {

$scope.loading = true;

$code.lookup($stateParams.code).then(function(code){
  $scope.code = code;
  $scope.loading = false;
});

$scope.user = {
  name: {},
  email: ''
};

$scope.confirm = false;


if($user.getUser()){
  $scope.confirm = true;
  $scope.user = $user.user;
}

$scope.continue = function(name, email){

  if(!$scope.loading){


  $code.reveal(name, email, $stateParams.code).then(function(reveal){
    if(reveal.status == "APPROVED"){
      $state.go('gift', {revealId: reveal._id})
    }else{
      $state.go('sign', {revealId: reveal._id})
    }
  });

   }

  $scope.loading = true;


}



});
