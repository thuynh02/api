'use strict'

var ExampleModel = require("./example.model.js");

function * getGreeting() {
    return new ExampleModel("Hello WorldTest!").toJSON();
}

function * addUser(data) {
  if(data.first_name === undefined) {
    this.throw(400, "Name is required");
    return;
  }

  if(data.last_name === undefined) {
    this.throw(400, "Age is required");
    return;
  }

  if(data.email === undefined) {
    this.throw(400, "Email is required");
    return;
  }

  if(data.username === undefined) {
    this.throw(400, "Username is required");
    return;
  }

  var response = yield new ExampleModel("Creating User").addUser(data);

  return response;
}

module.exports = {
  getGreeting,
  addUser
};