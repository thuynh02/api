var UModel = require('./users.model.js');

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

function * findOrCreate(data){
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

function * setVisitedPages(data){
    var params = ['info_visited', 'skills_visited', 'interests_visite'];
    var missingParams = '';

    for(let i = 0; i < params.length; i++) {
        if(!data.hasOwnProperty(params[i])) {
            missingParams = params[i];
        }
    }
    var response = yield new UModel('Change a users visited pages').setVisitedPages(data);
};

module.exports = {
    getAllUsers,
    getUserById,
    removeUser,
    findOrCreate,
    setVisitedPages
};
