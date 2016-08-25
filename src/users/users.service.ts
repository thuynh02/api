var UModel = require('./users.model.js');

function * addUser(data) {
    // Validate parameters

    if (data.name === undefined){
        return { status : 400, body : "name is required" }
    }
    if (data.nickname === undefined){
        return { status : 400, body : "nickname is required" }
    }
    if (data.picture === undefined){
        return { status : 400, body : "picture is required" }
    }
    if (data.user_id === undefined){
        return { status : 400, body : "user_id is required" }
    }
};

function * getAllUsers() {
    var response = yield new UModel("Get all Users").getAllCapability;
};

module.exports = {
    addUser,
    getAllUsers
}
