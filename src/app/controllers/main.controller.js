(function(){
  'use strict';

  angular.module('flickrPhotoSearchByTag').controller('MainCtrl', MainCtrl);
  MainCtrl.$inject = ['$scope', 'FlickrApiService'];
  function MainCtrl($scope, FlickrApiService){
    // scope variables
    $scope.currentPage = 1;
    $scope.photoUrlArr = [];

    // scope methods
    $scope.getNextPageSelfiePhotoUrl = getNextPageSelfiePhotoUrl;

    function getPhotoUrlArrByTag(tag){
      // need to return a promise for asyn callback
      return FlickrApiService.flickrPhotoSearchApi(tag, $scope.currentPage).then(function(response){
        // convert xml format to json
        var jsonData = FlickrApiService.xmlToJson(response.data),
        photoData = FlickrApiService.getFlickrPhotoData(jsonData),
        photoUrlArr = photoData.photoArr;
        // parse page string into an integer
        $scope.currentPage = parseInt(photoData.currentPage);
        return photoUrlArr;
      });
    }

    function getNextPageSelfiePhotoUrl(){
      // show loading message
      $scope.loading = true;
      // push new photo url array
      getPhotoUrlArrByTag('selfie').then(function(photoUrlArr) {
        for(var i=0;i<photoUrlArr.length;i++) {
          if($scope.photoUrlArr.indexOf(photoUrlArr[i]) == -1) {
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

  
