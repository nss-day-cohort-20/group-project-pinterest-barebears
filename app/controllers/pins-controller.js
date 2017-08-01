'use strict';

pinApp.controller('PinsController', function($scope, PinFactory, $window, UserFactory, $routeParams){



	$scope.pinItem = {
	    title: "",
	    url: "",
	    uid: UserFactory.getUser(),
		boardid: $routeParams.boardid
	};

	$scope.addPin = () => {
		PinFactory.postNewPin($scope.pinItem)
		.then( (pinData) => {
			console.log(pinData);
		}
	};

	$scope.deletePin = () => {
		PinFactory.deletePin = () => {

		}
	};

	$scope.getPinId = (pin) => {
		let pinId = Object.keys(pin);
		return pinId;
	}


	// $scope.test = 'this is a test message';
});