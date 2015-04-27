'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('flickrPhotoSearchByTag'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should return a photo url array', inject(function($controller) {
    $controller('MainCtrl', {
      $scope: scope
    });
    expect(scope.getPhotoUrlArrByTag).toBeDefined();
    scope.getPhotoUrlArrByTag('selfie').then(function(photoUrlArr){
      expect(angular.isArray(photoUrlArr)).toBeTruthy();
      // selfie photos will be more than one
      expect((photoUrlArr).length).toBeGreaterThan(1);
      // photo url starts with 'http://farm'
      expect(photoUrlArr[0]).toContain('http://farm');
    });
  }));
});
