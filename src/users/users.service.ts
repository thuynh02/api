var UModel = require('./users.model.js');

function * getAllUsers() {
    var response = yield new UModel('Get all Users').getAllUsers();

    return response;
};

function * getUserById(user_id :number) {
    var response = yield new UModel('Get one user').getUserById(user_id);

    return response;
};

function * deleteUser(user_id :number){
    var response = yield new UModel('Delete a user');

    return response;
};

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser
};
