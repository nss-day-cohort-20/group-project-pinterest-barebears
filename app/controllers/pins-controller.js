'use strict';

pinApp.controller('PinsController', function($scope, PinFactory, $window, UserFactory, $routeParams){

	let currentUser = null;

	UserFactory.isAuthenticated()
	.then( (user) => {
		console.log("user status", user);
		currentUser = UserFactory.getUser();
		fetchPins();
	});

	$scope.pinItem = {
		title: "",
		url: "",
		uid: "",
		boardid: $routeParams.boardid
	};

	$scope.addPin = () => {
		$scope.pinItem.uid = UserFactory.getUser();
		PinFactory.postNewPin($scope.pinItem)
		.then( (pinData) => {
			$scope.pinItem.title = "";
			$scope.pinItem.url = "";
			fetchPins();
			console.log(pinData);
		});
	};



	function fetchPins(boardId) {
		if (boardId == $routeParams.boardId){
			let pinArr = [];
			console.log("Fetch called");
			PinFactory.getPins(currentUser)
			.then( (pinList) => {
				console.log("board Data", pinList);
				let pinData = pinList;
				Object.keys(pinData).forEach( (key) => {
					pinData[key].id = key;
					pinArr.push(pinData[key]);
				});
				$scope.pins = pinArr;
			})
			.catch( (err) => {
				console.log("error!", err);
			});
		}
	}

	$scope.deletePin = () => {
		PinFactory.deletePin = () => {

		};
	};

	$scope.getPinId = (pin) => {
		let pinId = Object.keys(pin);
		return pinId;
	};


	// $scope.test = 'this is a test message';
});