'use strict';

var ExampleModel = require("./example.model.js");

// Perform data validation and return response from the model
function * getAllUsers() {
  var response = yield new ExampleModel("Get All Users").getAllUsers();

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

  var response = yield new ExampleModel("Create User").addUser(data);

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

  var response = yield new ExampleModel("Update User").updateUser(data);

  return response;
}

function * deleteUser(data) {
  // Validate parameters
  if(data.user_id === undefined) {
    return { status : 400, body : "User Id is required"};
  }

  var response = yield new ExampleModel("Delete User").deleteUser(data);

  return response;
}

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser
};