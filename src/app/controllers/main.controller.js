(function(){
  'use strict';

  /* @ngInject */
  function MainCtrl( $stateParams, APP_NAME, FlickrApiService){
    // scope variables
    var vm = this;
    vm.currentPage = 1;
    vm.photoArr = [];

    // check if a tag is set, otherwise use the default tag '4mation'
    vm.tag = (typeof $stateParams.tag !== 'undefined')?$stateParams.tag:'4mation';
    vm.title = vm.tag;
    vm.APP_NAME = APP_NAME;
    vm.description = 'Scroll down to view more flickr photos';

    // scope methods
    vm.getPhotoUrlArrByTag = getPhotoUrlArrByTag;
    vm.getNextPagePhotoUrlByTag = getNextPagePhotoUrlByTag;

    /**
    *  name: getPhotoUrlArrByTag 
    *  desc: call FlickrApiService to retrieve data from flickr api
    *  @param {string} tag: search term
    */
    function getPhotoUrlArrByTag(tag){
      // need to return a promise for asyn callback
      return FlickrApiService.getFlickrPhotoData(tag, vm.currentPage).then(function(){
        if(FlickrApiService.photoData !== false) {
          var photoArr = FlickrApiService.photoData.photoArr;
          // parse page string into an integer
          vm.currentPage = parseInt(FlickrApiService.photoData.currentPage);
          return photoArr;  
        } else {
          return false;
        }
      });
    }

    /**
    *  name: getNextPagePhotoUrlByTag 
    *  desc: get the unique photo array and then render on the photowall view
    */
    function getNextPagePhotoUrlByTag(){
      // show loading message
      vm.loading = true;
      // push next page photo urls into the array
      getPhotoUrlArrByTag(vm.tag).then(function(photoArr) {
        if(photoArr !== false) {
          for(var i=0;i<photoArr.length;i++) {
            // Make sure no duplicates
            vm.photoArr = getUniquePhotoUrlArr(vm.photoArr, photoArr[i]);
          }
        }
      }).catch(function (err) {
        // log errors
        console.log(err);
      })
      .finally(function () {
        // set the current page to the next
        vm.currentPage += 1;
        // hide loading message
        vm.loading = false;
        vm.withResult = (vm.photoArr.length)?1:0;
        vm.message = 'No result yet. Let\'s try another term.';
      });
    }

    /**
    *  name: getUniquePhotoUrlArr
    *  desc: the function checks url uniqueness to prevent from populating duplicated photos
    *  @param {array} photoArr: unique photo array with title and url information
    *  @param {object} obj: a single photo object with title and url information
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

  angular.module('flickrPhotoSearchByTag').controller('MainCtrl', MainCtrl);
  MainCtrl.$inject = [ '$stateParams', 'APP_NAME', 'FlickrApiService'];
})();

  
