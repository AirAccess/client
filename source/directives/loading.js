angular.module('app').directive('loading', function() {
  return {
		restrict: 'E',
    transclude: true,
		scope: {
				active: '=',
		 },
    templateUrl: 'directives/loading'
  };
});
