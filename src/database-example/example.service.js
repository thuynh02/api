'use strict'

var ExampleModel = require("./example.model.js");

function * getAllUsers() {
  var response = yield new ExampleModel("Get All Users").getAllUsers();

  return response;
}

function * addUser(data) {
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

  var response = yield new ExampleModel("Creating User").addUser(data);

  return response;
}

function * deleteUser(data) {
  if(data.user_id === undefined) {
    return { status : 400, body : "User Id is required"};
  }

  var response = yield new ExampleModel("Deleting User").deleteUser(data);

  return response;
}

module.exports = {
  getAllUsers,
  addUser,
  deleteUser
};