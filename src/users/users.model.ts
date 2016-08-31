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
    try{
        yield model.User.findById(userId).on('success', function(user){
            console.log('logging the user', user)
            user.destroy().on('success', function(user) {
                if (user && user.deletedAt){
                    status = 204;
                    body = "User: " + userId + " was deleted";
                    model.logger.info(body);
                }
                else{
                    status = 409;
                    body = "User: " + userId + " was not deleted";
                    model.logger.warn(body);
                }
            })
        });      
    } catch(err) {
        status = 409;
        var error = err;
        this.logger.error(body);
    } finally {
        return { status : status, body : body};
    }
};

module.exports = UsersModel;

