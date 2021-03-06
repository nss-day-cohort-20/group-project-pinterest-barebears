'use strict';

pinApp.controller('PinsController', function($scope, PinFactory, BoardFactory, $window, UserFactory, $routeParams, FilterFactory){

	let currentUser = null;

	UserFactory.isAuthenticated()
	.then( (user) => {
		currentUser = UserFactory.getUser();
		fetchPins($routeParams.boardid);
	});

  $scope.searchText = FilterFactory;

	$scope.pinItem = {
		title: "",
		url: "",
		uid: "",
		boardid: $routeParams.boardid
	};

	BoardFactory.getBoard($routeParams.boardid)
	.then( (boardData)=>{
		console.log('boardData', boardData);
		$scope.boardName = boardData.title;
	});

	$scope.addPin = () => {
		$scope.pinItem.uid = UserFactory.getUser();
		PinFactory.postNewPin($scope.pinItem)
		.then( (pinData) => {
			$scope.pinItem.title = "";
			$scope.pinItem.url = "";
			fetchPins($routeParams.boardid);
			console.log(pinData);
		});
	};

	$scope.getBoardId = () => {
		let idOfBoard = $routeParams.boardid;
		return idOfBoard;
	};

	function fetchPins(boardId) {
			let pinArr = [];
			PinFactory.getPins(currentUser)
			.then( (pinList) => {
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

	$scope.deletePin = (pinId) => {
		console.log("pin id?", pinId);
		PinFactory.deletePin(pinId)
		.then( (data) => {
			console.log("data", data);
			fetchPins($routeParams.boardid);
		});
	};
});