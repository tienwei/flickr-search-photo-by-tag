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

	// test getFlickrPhotoData
	it('should get the photo data from the search', inject(function(FlickrApiService){
		FlickrApiService.flickrAPI('selfie').then(function(response){
			// return photo url array
			expect(angular.isArray(FlickrApiService.getFlickrPhotoData(FlickrApiService.xmlToJson(response.data)).photoArr)).toBeTruthy();
			// initial page is 1
			expect(FlickrApiService.getFlickrPhotoData(FlickrApiService.xmlToJson(response.data)).currentPage).toBe(1);
		});
	}));
});