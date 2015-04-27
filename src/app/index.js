'use strict';

angular.module('flickrPhotoSearchByTag', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'xml', 'infinite-scroll'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      // selfie home page
      .state('home', {
        url: '/',
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl'
      })
      // for tag search
      .state('tag', {
        url: '/tags/:tag',
        templateUrl: 'app/views/tag.html',
        controller: 'TagCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
