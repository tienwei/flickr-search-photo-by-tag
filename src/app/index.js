'use strict';

angular.module('flickrPhotoSearchByTag', ['myApp.config', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'xml', 'infinite-scroll'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      // selfie home page
      .state('home', {
        url: '/',
        templateUrl: 'app/views/photowall.html',
        controller: 'MainCtrl'
      })
      // for tag search
      .state('tag', {
        url: '/tags/:tag',
        templateUrl: 'app/views/photowall.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  });
