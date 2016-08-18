'use strict';
var SModel = require("./seq.model.js");

// Perform data validation and return response from the model
function * getAllCapability() {
  var response = yield new SModel("Get All Capabilities").getAllCapability();

  return response;
}

function * addUser(data) {
  // Validate parameters
  if(data.first_name === undefined) {
    return { status : 400, body : "Name is required"};
  }

  if(data.last_name === undefined) {
    return { status : 400, body : "Last Name is required"};
  }

  if(data.email === undefined) {
    return { status : 400, body : "Email is required"};
  }

  if(data.username === undefined) {
    return { status : 400, body : "Username is required"};
  }

  var response = yield new SModel("Create User").addUser(data);

  return response;
}

function * updateUser(data) {
  var validRequest = true;
  var requiredParams = ['user_id', 'first_name', 'last_name', 'email', 'username'];

  var missingParam = '';

  // Validate required parameters
  for(var i = 0; i < requiredParams.length; i++) {
    if(!data.hasOwnProperty(requiredParams[i])) {
      missingParam = requiredParams[i];
      validRequest = false;
      break;
    }
  }

  if(!validRequest) {
    return { status : 400, body: "Missing parameter: " + missingParam }
  }

  var response = yield new SModel("Update User").updateUser(data);

  return response;
}

function * deleteUser(data) {
  // Validate parameters
  if(data.user_id === undefined) {
    return { status : 400, body : "User Id is required"};
  }

  var response = yield new SModel("Delete User").deleteUser(data);

  return response;
}

module.exports = {
  getAllCapability/*,
  addUser,
  updateUser,
  deleteUser*/
};