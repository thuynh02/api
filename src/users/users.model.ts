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

userModel.findOrCreate = function * (data){
    var status, body;
    var model = this;
    try{
        yield this.User.findOrCreate({
            where : {
                auth0Id : data.user_id
            },
            defaults : {
                auth0Id : data.user_id,
                fname   : data.given_name,
                lname   : data.family_name,
                email   : data.email,
                picture : data.picture,
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

userModel.setVisitedPages = function * (data){
    var status, body;
    var model = this;
    try{
       model.find({ where: { personId: data.personId } })
        .on('success', function (user) {
            // Check if record exists in db
            if (user) {
                //check if the params are being passed values
                if (!data.hasOwnProperty('infoVisited')){
                    data.infoVisited = user.infoVisited;
                }
                if (!data.hasOwnProperty('interestsVisited')){
                    data.interestsVisited = user.interestsVisited;
                }
                if (!data.hasOwnProperty('skillsVisited')){
                    data.skillsVisited = user.skillsVisited;
                }
                user.updateAttributes({
                    infoVisited      : data.infoVisited,
                    interestsVisited : data.interestsVisited,
                    skillsVisited    : data.skillsVisited
                }).on('success', function (user) {
                    status = 200;
                    body = user;
                })
            }
            else{
                status = 404;
                body = 'User does not exist';
            }
        })
    } catch(err) {
        status = 409;
        body   = err;
        model.logger.error(body);
    } finally{
        return status;
    }
};


module.exports = UsersModel;

