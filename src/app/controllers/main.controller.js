(function(){
  'use strict';

  angular.module('flickrPhotoSearchByTag').controller('MainCtrl', MainCtrl);
  MainCtrl.$inject = ['$scope', '$stateParams', 'APP_NAME', 'FlickrApiService'];
  function MainCtrl($scope, $stateParams, APP_NAME, FlickrApiService){
    // scope variables
    $scope.currentPage = 1;
    $scope.photoArr = [];

    // check if a tag is set, otherwise use the default tag 'selfie'
    $scope.tag = (typeof $stateParams.tag !== 'undefined')?$stateParams.tag:'selfie';
    $scope.APP_NAME = APP_NAME;

    // scope methods
    $scope.getPhotoUrlArrByTag = getPhotoUrlArrByTag;
    $scope.getNextPagePhotoUrlByTag = getNextPagePhotoUrlByTag;

    function getPhotoUrlArrByTag(tag){
      // need to return a promise for asyn callback
      return FlickrApiService.getFlickrPhotoData(tag, $scope.currentPage).then(function(photoData){
        if(photoData !== false) {
          var photoArr = photoData.photoArr;
          // parse page string into an integer
          $scope.currentPage = parseInt(photoData.currentPage);
          return photoArr;  
        } else {
          return false;
        }
      });
    }

    function getNextPagePhotoUrlByTag(){
      // show loading message
      $scope.loading = true;
      // push next page photo urls into the array
      getPhotoUrlArrByTag($scope.tag).then(function(photoArr) {
        if(photoArr !== false) {
          for(var i=0;i<photoArr.length;i++) {
            // Make sure no duplicates
            $scope.photoArr = getUniquePhotoUrlArr($scope.photoArr, photoArr[i]);
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
        $scope.withResult = ($scope.photoArr.length)?1:0;
        $scope.message = 'No result yet. Let\'s try another term.';
      });
    }

    /*
      This function checks url uniqueness to prevent from populating duplicated photos
      @ photoArr: unique photo array with title and url information
      @ obj: a single photo object with title and url information
     */
    function getUniquePhotoUrlArr(photoArr, obj) {
      var unique = true,
      uniquePhotoUrlArr = photoArr;
      // check if the obj's url unique
      angular.forEach(photoArr, function(photo){
        if(photo.url === obj.url) {
          // not unique
          unique = false;
        }
      });
      if(unique) {
          // only push a unique obj
          uniquePhotoUrlArr.push(obj);
      }
      return uniquePhotoUrlArr;
    }
  }
})();

  
