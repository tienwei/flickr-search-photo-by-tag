(function(){
	'use strict';

	/* @ngInject */
	function SearchCtrl ($state) {
		// variables
		var vm = this;

		// methods
		vm.gotoTagSearch = gotoTagSearch;
		function gotoTagSearch() {
			var typedTag = vm.searchTag;
			// pass the entered tag to mainCtrl
	      	$state.go('tag', {'tag':typedTag});
	    }
	}

	angular.module('flickrPhotoSearchByTag').controller('SearchCtrl', SearchCtrl);
	SearchCtrl.$inject = ['$state'];
})();

