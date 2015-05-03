// (function(){
// 	'use strict';
// 	angular.module('flickrPhotoSearchByTag').directive('backgroundImg', function () {
// 		return {
// 			restrict: 'EA',
// 			replace: true,
// 			scope: true,
// 			scope: {
// 				photoArr: "=",
// 				withResult: "@"
// 			},
// 			template: [
// 				'<div class="col-sm-6 col-md-4" ng-repeat="photo in photoArr" ng-if="withResult">',
// 				'<a href="{{::photoUrl}}">',
// 				'<div class="thumbnail" style="background-image: url({{::photo.url}})">',
// 				'<div class="photo_title"><h4>{{::photo.title}}</h4></div>',
// 				'</div></a></div>'
// 			].join('')
// 		}
// 	});
// })();
