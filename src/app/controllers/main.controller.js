(function(){
  'use strict';

  angular.module('flickrPhotoSearchByTag').controller('MainCtrl', MainCtrl);
  MainCtrl.$inject = ['$scope', '$stateParams', 'APP_NAME', 'FlickrApiService'];
  function MainCtrl($scope, $stateParams, APP_NAME, FlickrApiService){
    // scope variables
    $scope.currentPage = 1;
    $scope.photoUrlArr = [];
    // check if a tag is set, otherwise use the default tag 'selfie'
    $scope.tag = (typeof $stateParams.tag !== 'undefined')?$stateParams.tag:'selfie';
    $scope.APP_NAME = APP_NAME;

    // scope methods
    $scope.getPhotoUrlArrByTag = getPhotoUrlArrByTag;
    $scope.getNextPagePhotoUrlByTag = getNextPagePhotoUrlByTag;

    function getPhotoUrlArrByTag(tag){
      // need to return a promise for asyn callback
      return FlickrApiService.getFlickrPhotoData(tag, $scope.currentPage).then(function(photoData){
        var photoUrlArr = photoData.photoArr;
        // parse page string into an integer
        $scope.currentPage = parseInt(photoData.currentPage);
        return photoUrlArr;
      });
    }

    function getNextPagePhotoUrlByTag(){
      // show loading message
      $scope.loading = true;
      // push next page photo urls into the array
      getPhotoUrlArrByTag($scope.tag).then(function(photoUrlArr) {
        for(var i=0;i<photoUrlArr.length;i++) {
          if($scope.photoUrlArr.indexOf(photoUrlArr[i]) === -1) {
            $scope.photoUrlArr.push(photoUrlArr[i]);
          }
        }
      }).catch(function (err) {
        // log errors
        console.log(err);
      })
      .finally(function () {
        // set the current page to the next
        $scope.currentPage += 1;
        // hide loading message
        $scope.loading = false;
      });
    }
  }
})();

  
