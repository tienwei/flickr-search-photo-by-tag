'use strict';

describe('factories', function(){

	beforeEach(module('flickrPhotoSearchByTag'));

	// test flickrAPI
	it('returns 200 status', inject(function(FlickrApiService){
		FlickrApiService.flickrAPI('selfie').then(function(response){
			// Successful return code: 200
			expect(response.status).toBe(200);
		});
	}));

	// test xmlToJson
	it('returns a json', inject(function(FlickrApiService){
		FlickrApiService.flickrAPI('selfie').then(function(response){
			// convert xml to json
			expect(angular.isJson(FlickrApiService.xmlToJson(response.data))).toBeTruthy();
		});
	}));

	// test getFlickrPhotoUrlArray
	it('should get the photo array from the search', inject(function(FlickrApiService){
		FlickrApiService.flickrAPI('selfie').then(function(response){
			expect(angular.isArray(FlickrApiService.getFlickrPhotoUrlArray(FlickrApiService.xmlToJson(response.data)))).toBeTruthy();
		});
	}));
});