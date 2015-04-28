'use strict';

describe('controllers', function(){
  var $controller, FlickrApiService, createController, scope, rootScope;
  beforeEach(module('flickrPhotoSearchByTag'));

  beforeEach(function() {
    inject(function(_FlickrApiService_, _$q_, _$rootScope_, _$controller_) {
        var deferred = _$q_.defer();
        FlickrApiService = _FlickrApiService_;
        rootScope = _$rootScope_;
        $controller = _$controller_;
        scope = rootScope.$new();
        // mock up FlickrApiService's getFlickrPhotoData method
        deferred.resolve({currentPage:3,photoArr:['http://farm9.staticflickr.com/8729/17285293692_6534eab4c3.jpg', 'http://farm8.staticflickr.com/7684/17100677539_fb1368e9f5.jpg']});
        spyOn(FlickrApiService, 'getFlickrPhotoData').and.returnValue(deferred.promise);
    });
  });

  it('should return a photo array with two urls, current page is 3', function() {
    $controller('MainCtrl', {
      $scope: scope
    });
    scope.getPhotoUrlArrByTag('selfie').then(function(photoArr){
      // the mock returns two photo urls
      expect(photoArr.length).toBe(2);
      // check the first photo url
      expect(photoArr[0]).toBe('http://farm9.staticflickr.com/8729/17285293692_6534eab4c3.jpg');
    });
    // update the scope
    scope.$digest();
    expect(scope.currentPage).toBe(3);
  });
});
