'use strict';

describe('factories', function(){

	beforeEach(module('flickrPhotoSearchByTag'));

	it('returns 200 status', inject(function(FlickrApiService){
		FlickrApiService.flickrAPI('selfie').then(function(response){
			// Successful return code: 200
			expect(response.status).toBe(200);
		});
	}));
});