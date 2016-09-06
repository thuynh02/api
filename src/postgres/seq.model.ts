var db = require('../server/sweet-skills-database');
var capability = require('./../models/capability');


function SeqModel(message:string) {
  this.message = message;
  this.Capability = capability(db.sequelize, db.Sequelize);
  this.logger = require('../server/logger');
  //this.Capability.sync();
}

var model = SeqModel.prototype;

// Query database and return an http status code and body

model.getAllCapability = function * () {
  var status = 409;
  var body = '';
  var model = this;
  try {
    yield this.Capability.findAll().then(function(results:any){
      status = 200;
      body = results;
      model.logger.info("Capability retrieved");
    });
  } catch(err) {
    status = 409;
    body = err;
    this.logger.error(body);
  } finally {
    return { status : status, body : body};
  }
};

model.addCapability = function * (data:any) {
  var status = 409;
  var body = '';
  var model = this;
  try {
    yield this.Capability.findOrCreate({
      where : {
        cap_name : data.cap_name
      },
      defaults : {
        party_id : data.party_id,
        cap_name : data.cap_name,
        category : data.category,
        skill : data.skill,
        type : data.type
      }
    }).spread(function(cap:any, created:any) {
      if(created) {
        status = 201;
        body = cap;
      } else {
        status = 400;
        body = "Capability already exists!";
        model.logger.warn(body);
      }
    });
  } catch(err) {
    status = 409;
    var error = err;
    this.logger.error(body);
  } finally {
    return { status : status, body : body};
  }
};

model.updateUser = function * (data:any) {
  var status = 409;
  var body = '';
  var model = this;
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
    .then(function(result:any) {
      if(result) {
        status = 204;
        body = "User updated!";
        model.logger.info(body);
      }
      else {
        status = 409;
        body = "Unable to update user";
        model.logger.warn(body);
      }
    }, function(error:any) {
      status = 500;
      body = error;
      model.logger.error(body);
    });
  } catch(error) {
    status = 409;
    body = error;
    this.logger.error(body);
  } finally {
    return { status : status, body : body};
  }
};

model.deleteUser = function * (data:any) {
  var status = 409;
  var body = '';
  var model = this;
  try {
    yield this.User.destroy({
      where: {
        user_id: data.user_id
      }
    }).then(function(deletedRows:any){
      if(deletedRows) {
        status = 204;
        body = "User: " + data.user_id + " was deleted";
        model.logger.info(body);
      } else {
        status = 409;
        body = "User: " + data.user_id + " was not deleted";
        model.logger.warn(body);
      }
    });
  } catch(err) {
    status = 409;
    var error = err;
    this.logger.error(body);
  } finally {
    return { status : status, body : body};
  }
};

module.exports = SeqModel;