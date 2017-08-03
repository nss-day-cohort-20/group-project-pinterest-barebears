'use strict';

pinApp.factory("BoardFactory", function($q, $http, FirebaseUrl) {

  let getBoards = (userId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}boards.json?orderBy="uid"&equalTo="${userId}"`)
      .then( (boardData) => {
        resolve(boardData.data);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  };

  let getBoard = (boardId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}boards/${boardId}.json`)
      .then( (boardData) => {
        console.log('boardData', boardData);
        resolve(boardData.data);
      })
      .catch( (err) => {
        console.log('oops', err);
        reject(err);
      });
    });
  };

  let postNewBoard = (newBoard) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}boards.json`,
        angular.toJson(newBoard))
      .then( (newBoardData) => {
        resolve(newBoardData);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };

  let deleteBoard = (boardId) => {
    return $q( (resolve, reject) => {
      if (boardId) {
        $http.delete(`${FirebaseUrl}boards/${boardId}.json`)
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
          reject(err);
        });
      } else {
        console.log("No id passed in");
      }
    });
  };

  return {getBoards, postNewBoard, deleteBoard, getBoard};
});