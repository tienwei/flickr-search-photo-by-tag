(function(){
  'use strict';

  angular.module('flickrPhotoSearchByTag').controller('TagCtrl', TagCtrl);
  TagCtrl.$inject = ['$scope', '$stateParams', 'FlickrApiService'];
  function TagCtrl($scope, $stateParams, FlickrApiService){
    // scope variables
    $scope.currentPage = 1;
    $scope.photoUrlArr = [];
    // scope methods
    $scope.getNextPagePhotoUrlByTag = getNextPagePhotoUrlByTag;
    $scope.tag = $stateParams.tag;

    function getPhotoUrlArrByTag(tag){
      // need to return a promise for asyn callback
      return FlickrApiService.flickrPhotoSearchApi(tag, $scope.currentPage).then(function(response){
        // convert xml format to json
        var jsonData = FlickrApiService.xmlToJson(response.data),
        photoData = FlickrApiService.getFlickrPhotoData(jsonData),
        photoUrlArr = photoData.photoArr;
        $scope.currentPage = parseInt(photoData.currentPage);
        return photoUrlArr;
      });
    }

    function getNextPagePhotoUrlByTag(){
      // show loading message
      $scope.loading = true;
      // concat new photo url array
      getPhotoUrlArrByTag($scope.tag).then(function(photoUrlArr) {
        for(var i=0;i<photoUrlArr.length;i++) {
          if($scope.photoUrlArr.indexOf(photoUrlArr[i]) == -1) {
            $scope.photoUrlArr.push(photoUrlArr[i]);
          }
            
        }
      }).catch(function (err) {
        // log error somehow.
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

  
