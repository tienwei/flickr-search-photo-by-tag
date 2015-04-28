'use strict';
 
describe('flickr api factory', function(){
	var apiUrl = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=f88e45b3d09c37b1336a8c1561d414b8' + 
				 '&tags=selfie&per_page=6&page=1';
	beforeEach(module('flickrPhotoSearchByTag'));
	// test flickrPhotoSearchApi
	it('should return 200 status', inject(function(FlickrApiService, $httpBackend){
		$httpBackend.expect('GET', apiUrl).respond(200, '<photos>flickr photo search xml</photos>');
		FlickrApiService.flickrPhotoSearchApi('selfie',1).then(function(response){
			expect(response.status).toBe(200);
		});
		$httpBackend.flush();
	}));
});