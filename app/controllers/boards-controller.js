'use strict';

pinApp.controller("BoardsController", function($scope, $window, BoardFactory, UserFactory, PinFactory) {

  let currentUser = null;

  UserFactory.isAuthenticated()
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchBoards();
  });

 $scope.newBoardItem = {
    title: "",
    url: "",
    uid: ""
  };

  $scope.saveBoardItem = () => {
    $scope.newBoardItem.uid = UserFactory.getUser();
    BoardFactory.postNewBoard($scope.newBoardItem)
    .then( (data) => {
      fetchBoards();
    });
  };

  function fetchBoards() {
    let boardArr = [];
    BoardFactory.getBoards(currentUser)
    .then( (boardList) => {
      let boardData = boardList;
      Object.keys(boardData).forEach( (key) => {
        boardData[key].id = key;
        boardArr.push(boardData[key]);
      });
      $scope.boards = boardArr;
    })
    .catch( (err) => {
      console.log("error!", err);
    });
  }

  $scope.loadPins = (boardId) => {
  $window.location.href = `/#!/pins/${boardId}`;
  };

  $scope.deleteBoard = (boardId) => {
    let pinDeleteArray = [];
    PinFactory.getPins(currentUser)
    .then((pins)=>{
      // console.log('users pins', pins);
      Object.keys(pins).forEach((key)=>{
        if (pins[key].boardid === boardId) {
          pins[key].id = key;
          pinDeleteArray.push(pins[key]);
        }
      });
      // console.log('pinDeleteArray', pinDeleteArray);
      pinDeleteArray.forEach((pinToDelete)=>{
        PinFactory.deletePin(pinToDelete.id);
      });
    })
    .then(()=>{
      BoardFactory.deleteBoard(boardId, currentUser)
      .then( (data) => {
        fetchBoards(currentUser);
      });
    });
  };
});
