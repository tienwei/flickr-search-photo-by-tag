'use strict';
 
describe('flickr api factory', function(){
	var apiUrl = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=f88e45b3d09c37b1336a8c1561d414b8' + 
				 '&tags=selfie&per_page=6&page=1&format=json&nojsoncallback=1';
	beforeEach(module('flickrPhotoSearchByTag'));
	// test flickrPhotoSearchApi
	it('should return ok status', inject(function(FlickrApiService, $httpBackend){
		$httpBackend.expect('GET', apiUrl).respond('ok', '<photos>flickr photo search xml</photos>');
		FlickrApiService.flickrPhotoSearchApi('selfie',1).then(function(response){
			expect(response.status).toBe('ok');
		});
		$httpBackend.flush();
	}));
});