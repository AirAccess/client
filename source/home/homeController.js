angular.module('app').controller('homeController', function($scope, $code, $state, $stateParams, $user, $location) {

    $user.storeUser($stateParams);

    $location.url($location.path());

    $scope.loading = false;

    $scope.reveal = function(code) {
        if (!$scope.loading) {
            $scope.loading = true;
            $code.lookup(code).then(function(success) {
                $scope.error = false;
                console.log(success);
                if(success.revealed){
                  if (success.reveal.status == "APPROVED") {
                      $state.go('gift', {
                          revealId: success.reveal._id
                      })
                  } else {
                      $state.go('sign', {
                          revealId: success.reveal._id
                      })
                  }
                }else if ($user.getUser() && $user.user.email && $user.user.name.first && $user.user.name.last) {
                    $code.reveal($user.user.name, $user.user.email, code).then(function(reveal) {
                        $scope.loading = false;
                        console.log(reveal);
                        if (reveal.status == "APPROVED") {
                            $state.go('gift', {
                                revealId: reveal._id
                            })
                        } else {
                            $state.go('sign', {
                                revealId: reveal._id
                            })
                        }
                    });
                } else {
                    $scope.loading = false;

                    $state.go('revealed', {
                        code: success.code
                    });
                }
            }).catch(function(error) {
                $scope.error = error;
                $scope.loading = false;
            });
        }
    }




});
