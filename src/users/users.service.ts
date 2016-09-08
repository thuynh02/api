'use strict'
var UModel = require('./users.model');

function * getAllUsers() {
    var response = yield new UModel('Get all Users').getAllUsers();

    return response;
};

function * getUserById(userId :number) {
    var response = yield new UModel('Get one user').getUserById(userId);

    return response;
};

function * removeUser(userId :number){
    var response = yield new UModel('Delete a user').removeUser(userId);

    return response;
};

function * findOrCreate(data:any){
    var validRequest   = true;
    var requiredParams = ['user_id', 'given_name', 'family_name', 'email', 'picture'];
    var missingParam   = '';

    for(let i = 0; i < requiredParams.length; i++) {
        if(!data.hasOwnProperty(requiredParams[i])) {
            missingParam = requiredParams[i];
            validRequest = false;
            break;
        }
    }
    if (!validRequest){
        return { status : 400, body: 'Missing parameter: ' + missingParam }
    }
    var response = yield new UModel().findOrCreate(data);
    return response;
};



module.exports = {
    getAllUsers,
    getUserById,
    removeUser,
    findOrCreate
};
