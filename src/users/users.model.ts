'use strict'
var db     = require('../server/sweet-skills-database.js');
var person = require('./../models/person.js');


function UsersModel(message: string){
    this.message = message;
    this.User    = person(db.sequelize, db.Sequelize);
    this.logger  = require('../server/logger.js');
}

var userModel = UsersModel.prototype;

userModel.getAllUsers = function * (){
    var status, body;
    var model = this;
    try{
        yield model.User.findAll().then(function(results){
            status = 200;
            body   = results;
            model.logger.info("Users retrieved");
            });
    } catch(err) {
        status = 409;
        body   = err;
        userModel.logger.error(body);
    } finally{
        return { status : status, body : body };
    }
};

userModel.getUserById = function * (userId :number) {
    var status, body;
    var model = this;
    try{
        yield model.User.findById(userId).then(function(results){
            //console.log(results);
            if (results!=null){
                status = 200;
                body   = results;
                model.logger.info('User ', userId, ' retrieved');
            }
            else{
                status = 404;
                body   = 'User does not exist!';
            }
           
        });
    } catch(err) {
        status = 409;
        body   = err;
        userModel.logger.error(body);
    } finally {
        return { status : status, body : body };
    }
};

userModel.removeUser = function * (userId :number) {
  var status, body;
  var model = this;

  try {
    yield this.User.destroy({
      where: {
        personId : userId
      }
    }).then(function(deletedRows:any){
      if(deletedRows) {
        status = 204;
        body = 'User: ' + userId + ' was deleted';
      } else {
        status = 409;
        body = 'User: ' + userId + ' was not deleted';
        model.logger.warn(body);
      }
    });
  } catch(err) {
      status = 409;
      body = err;
      this.logger.error(body);
  } finally {
      return { status : status, body : body };
  }
};

//TODO: Stop spoofing the data in groupId. This data can't be null,
//but it needs to come from somewhere...
userModel.findOrCreate = function * (data){
    var status, body;
    var model = this;
    try{
        yield model.User.findOrCreate({
            where : {
                auth0Id : data.user_id
            },
            defaults : {
                auth0Id : data.user_id,
                fName   : data.given_name,
                lName   : data.family_name,
                email   : data.email,
                profilePicture : data.picture,
                groupId : 1
            }
        }).spread(function(user, created) {
            if(created){
                status = 201;
                body   = user;
            }
            else {
                status = 200;
                body   = user;
            }
        })
    } catch(err) {
        status = 409;
        body   = err;
        model.logger.error(body);
    } finally{
        return { status : status, body : body };
    }
};



module.exports = UsersModel;

