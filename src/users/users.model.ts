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

userModel.getUserById = function * (user_id :number) {
    var status, body;
    var model = this;
    try{
        yield model.User.findById(user_id).then(function(results){
            //console.log(results);
            if (results!=null){
                status = 200;
                body   = results;
                model.logger.info('User ', user_id, ' retrieved');
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

module.exports = UsersModel;

