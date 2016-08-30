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

module.exports = {
    getAllUsers,
    getUserById,
    removeUser
};
