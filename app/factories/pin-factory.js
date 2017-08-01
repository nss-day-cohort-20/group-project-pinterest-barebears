'use strict';

pinApp.factory('PinFactory', function($q, $http, FirebaseUrl, FBCreds) {

//get pins associated both with user, need to sort by board id in the controller
 let getPins = (userId)=>{
    return $q ((resolve, reject)=>{
        $http.get(`${FirebaseUrl}pins.json?orderBy="uid"&equalTo="${userId}"`)
        .then((pinsData)=>{
            resolve(pinsData.data);
        })
        .catch((err)=>{
            console.log ("error getting pins", err);
            reject(err);
        });
    });
 };

 let postNewPin =(newPin)=>{
    return $q((resolve, reject)=>{
        $http.post(`${FirebaseUrl}pins.json`, angular.toJson(newPin))
        .then((newPinData)=>{
            resolve(newPinData);
        })
        .catch((err)=>{
            reject(err);
        });
    });
 };

 let deletePin = (pinId)=>{
    return $q ((resolve, reject)=>{
        if(pinId){
            $http.delete(`${FirebaseUrl}pins/${pinId}.json`)
            .then((data)=>{
                resolve(data);
            })
            .catch((err)=>{
                reject(err);
            });
        }else{
            console.log ("didn't get the id for deletion");
        }
    });
 };

 let getOnePinDetail = (pinId) =>{
    return $q((resolve, reject)=>{
        $http.get(`${FirebaseUrl}pins/${pinId}.json`)
        .then((pin)=>{
            resolve(pin.data);
        })
        .catch((err)=>{
            reject(err);
        });
    });
 };

	return {getPins, postNewPin, deletePin, getOnePinDetail};
});