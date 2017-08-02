"use strict";

let pinApp = angular.module("PinApp", ["ngRoute", "wu.masonry"])
.constant("FirebaseUrl", "https://barebearspinterest.firebaseio.com/");

let isAuth = (UserFactory) => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if(userBoolean) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

pinApp.config( ($routeProvider) => {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html',
			controller: 'UserController'
		})
		.when('/pins/:boardid', {
			templateUrl: 'partials/pins.html',
			controller: 'PinsController'
		})
		.when('/boards', {
			templateUrl: 'partials/boards.html',
			controller: 'BoardsController'
		})
		.otherwise('/');
});