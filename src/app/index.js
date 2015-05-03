'use strict';

angular.module('flickrPhotoSearchByTag', ['myApp.config', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'infinite-scroll'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      // home page
      .state('home', {
        url: '/',
        templateUrl: 'app/views/photoWall.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      // for tag search
      .state('tag', {
        url: '/tags/:tag',
        templateUrl: 'app/views/photoWall.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      // for photo details
      .state('detail', {
        url: '/tags/:tag/:photoID',
        templateUrl: 'app/views/photoDetails.html',
        controller: 'DetailCtrl',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  });
