(function(){
  'use strict';

  describe('main controller', function(){
    var controller, FlickrApiService, scope;
    beforeEach(module('flickrPhotoSearchByTag'));

    beforeEach(function() {
      inject(function(_FlickrApiService_, _$q_, _$controller_) {
          var deferred = _$q_.defer();
          FlickrApiService = _FlickrApiService_;
          controller = _$controller_('MainCtrl', {});
          scope = {};

          // mock up FlickrApiService's getFlickrPhotoData method
          deferred.resolve({currentPage:3,photoArr:['http://farm9.staticflickr.com/8729/17285293692_6534eab4c3.jpg', 'http://farm8.staticflickr.com/7684/17100677539_fb1368e9f5.jpg']});
          spyOn(FlickrApiService, 'getFlickrPhotoData').and.returnValue(deferred.promise);
      });
    });

    it('should return a photo array with two urls, current page is 3', function() {
      controller.getPhotoUrlArrByTag('selfie').then(function(photoArr){
        // the mock returns two photo urls
        expect(photoArr.length).toBe(2);
        // check the first photo url
        expect(photoArr[0]).toBe('http://farm9.staticflickr.com/8729/17285293692_6534eab4c3.jpg');
        // check if the page no. is set to 3 from the mockup getFlickrPhotoData method
        expect(controller.currentPage).toBe(3);
      });
    });
  });
})();
