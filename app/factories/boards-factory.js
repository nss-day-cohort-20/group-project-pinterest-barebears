'use strict';

pinApp.factory("BoardFactory", function($q, $http, FirebaseUrl) {

  let getBoards = (userId) => {
    console.log("userId", userId);
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}todos.json?orderBy="uid"&equalTo="${userId}"`)
      .then( (todoData) => {
        resolve(todoData);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  };

  let postNewBoard = (newItem) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}todos.json`,
        angular.toJson(newItem))
      .then( (newItemData) => {
        resolve(newItemData);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };

  let deleteBoard = (todoId) => {
    return $q( (resolve, reject) => {
      if (todoId) {
        $http.delete(`${FirebaseUrl}todos/${todoId}.json`)
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

  return {getBoards, postNewBoard, deleteBoard};
});