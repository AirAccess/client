angular.module('app', [
    'ui.router',
    'mui',
    'ng-fastclick',
    'ngAnimate'
]).config(function($stateProvider, $urlRouterProvider, $locationProvider) {


    var navigation = {
        name: 'navigation',
        templateUrl: 'nav/nav'
    }

    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider
        .state(navigation)
        .state('home', {
            url: "/?email&first_name&last_name",
            templateUrl: "home/home",
            parent: navigation
        }).state('revealed', {
            url: "/revealed/:code",
            templateUrl: "revealed/revealed",
            parent: navigation
        }).state('sign', {
            url: "/sign/:revealId",
            templateUrl: "sign/sign",
            parent: navigation
        }).state('gift',  {
          url: "/card/:revealId",
          templateUrl: "giftCard/card",
          parent: navigation
        })




})


.controller('rootController', function($scope, $user) {


  $user.getUser();


});
