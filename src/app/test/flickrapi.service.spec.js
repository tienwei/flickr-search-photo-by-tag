(function(){
	'use strict';
 
	describe('flickr api service', function(){
		var apiUrl = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=239125bcc03d4efa36227d1e4eec735a&tags=sydney&per_page=6&page=1&format=json&nojsoncallback=1',
			httpBackend,
			FlickrApiService,
			fakeJson = '{ "photos": { "page": 1, "pages": "4064", "perpage": 100, "total": "406359",' + 
			    '"photo": [' +
			    '{ "id": "17166437509", "owner": "98942020@N00", "secret": "801569ba36", "server": "8770", "farm": 9, "title": "150426-0339-EOSM.jpg", "ispublic": 1, "isfriend": 0, "isfamily": 0 },' +
			    '{ "id": "17352602375", "owner": "98942020@N00", "secret": "f80ff6c1c0", "server": "7674", "farm": 8, "title": "150426-0338-EOSM.jpg", "ispublic": 1, "isfriend": 0, "isfamily": 0 },' +
			    '{ "id": "17350710172", "owner": "67406666@N00", "secret": "c8ce16159f", "server": "8694", "farm": 9, "title": "Savannah Guthrie NBC Today Sydney arrival__credit_ Destination NSW_007.jpg", "ispublic": 1, "isfriend": 0, "isfamily": 0 }' +
				'] }, "stat": "ok" }';

		beforeEach(module('flickrPhotoSearchByTag'));
		beforeEach(inject(function($httpBackend, _FlickrApiService_){
			// Set up the mock http service responses
     		httpBackend = $httpBackend;
     		FlickrApiService = _FlickrApiService_;
		}));

		afterEach(function() {
	     httpBackend.verifyNoOutstandingExpectation();
	     httpBackend.verifyNoOutstandingRequest();
	    });
		// test flickrPhotoSearchApi
		it('should return ok status', function(){
			httpBackend.expectGET(apiUrl).respond(fakeJson);
			FlickrApiService.flickrPhotoSearchApi('sydney',1).then(function(response){
				expect(response.stat).toBe('ok');
			});
			httpBackend.flush();
		});
	});
})();