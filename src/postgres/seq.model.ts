var db = require('../server/sweet-skills-database.js');
var capability = require('./../models/capability.js');


function SeqModel(message) {
  this.message = message;
  this.Capability = capability(db.sequelize, db.Sequelize);
  //this.Capability.sync();
}

var model = SeqModel.prototype;

// Query database and return an http status code and body

model.getAllCapability = function * () {
  var status, body;

  try {
    yield this.Capability.findAll().then(function(results){
      status = 200;
      body = results;
    });
  } catch(err) {
    status = 409;
    body = err;
  } finally {
    return { status : status, body : body};
  }
};

model.addUser = function * (data) {
  var status, body;

  try {
    yield this.User.findOrCreate({
      where : {
        $or : {
          email : data.email,
          username : data.username
        }
      },
      defaults : {
        first_name : data.first_name,
        last_name : data.last_name,
        email : data.email,
        username : data.username
      }
    }).spread(function(user, created) {
      if(created) {
        status = 201;
        body = user;
      } else {
        status = 400;
        body = "User already exists!";
      }
    });
  } catch(err) {
    status = 409;
    var error = err;
  } finally {
    return { status : status, body : body};
  }
};

model.updateUser = function * (data) {
  var status, body;

  try {
    yield this.User.update({
      first_name : data.first_name,
      last_name : data.last_name,
      email : data.email,
      username : data.username
    },
    {
      where : {
        user_id : data.user_id
      }
    })
    .then(function(result) {
      if(result) {
        status = 204;
        body = "User updated!";
      }
      else {
        status = 409;
        body = "Unable to update user";
      }
    }, function(error) {
      status = 500;
      body = error;
    });
  } catch(error) {
    status = 409;
    body = error;
  } finally {
    return { status : status, body : body};
  }
};

model.deleteUser = function * (data) {
  var status, body;

  try {
    yield this.User.destroy({
      where: {
        user_id: data.user_id
      }
    }).then(function(deletedRows){
      if(deletedRows) {
        status = 204;
        body = "User: " + data.user_id + " was deleted";
      } else {
        status = 409;
        body = "User: " + data.user_id + " was not deleted";
      }
    });
  } catch(err) {
    status = 409;
    var error = err;
  } finally {
    return { status : status, body : body};
  }
};

module.exports = SeqModel;