(function(){
	'use strict';
	// create my app config for constant variables
	angular.module('myApp.config', [])
	    .constant('APP_NAME','Flickr Search By Terms')
	    .constant('APP_VERSION','0.1')
	    .constant('API_BASEURL', 'https://api.flickr.com/services/rest/?&method=')
	    .constant('API_KEY','239125bcc03d4efa36227d1e4eec735a')
	    .constant('PER_PAGE','6');
})();
