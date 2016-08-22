'use strict';
var SModel = require("./seq.model.js");

// Perform data validation and return response from the model
function * getAllCapability() {
  var response = yield new SModel("Get All Capability").getAllCapability();

  return response;
}

function * addCapability(data) {
  // Validate parameters
  
  if(data.party_id === undefined) {
    return { status : 400, body : "party_id is required"};
  }

  if(data.cap_name === undefined) {
    return { status : 400, body : "cap_name is required"};
  }

  if(data.category === undefined) {
    return { status : 400, body : "category is required"};
  }

  if(data.skill === undefined) {
    return { status : 400, body : "skill is required"};
  }
  
  if(data.type === undefined) {
    return { status : 400, body : "type is required"};
  }

  var response = yield new SModel("Create Capability").addCapability(data);

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
  getAllCapability,
  addCapability
};