'use strict';
 
describe('flickr api factory', function(){
	var apiUrl = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=f88e45b3d09c37b1336a8c1561d414b8' + 
				 '&tags=selfie&per_page=6&page=1';
	beforeEach(function(){
		module('flickrPhotoSearchByTag');

		module(function($provide) {
    
		// Fake StoreService Implementation returning a promise
		$provide.value('StoreService', {
		listStores: function() {
		  return { 
		    then: function(callback) {return callback([{ some: "thing", hoursInfo: {isOpen: true}}]);}
		  };
		},
		chooseStore: function() { return null;}
		});
	});
	// test flickrPhotoSearchApi
	it('should return 200 status', inject(function(FlickrApiService, $httpBackend){
		$httpBackend.expect('GET', apiUrl).respond(200, '<photos>flickr photo search xml</photos>');
		FlickrApiService.flickrPhotoSearchApi('selfie',1).then(function(response){
			expect(response.status).toBe(200);
		});
		$httpBackend.flush();
	}));

	// test getFlickrPhotoData
	it('should get the photo data from the search with selfie tag', inject(function(FlickrApiService){
		$httpBackend.expect('GET', apiUrl).respond(200, '<photos>flickr photo search xml</photos>');
		FlickrApiService.getFlickrPhotoData('selfie',1).then(function(response){
			expect(response.status).toBe(200);
		});
		$httpBackend.flush();
	}));
});