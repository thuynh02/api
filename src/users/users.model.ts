var db     = require('../server/sweet-skills-database');
var person = require('./../models/person');
import {ApiModel} from './ApiModel';

class UsersModel extends ApiModel{
    constructor(){
        super(db, person);
    };
    /*
    userModel.getUserById = function * (userId :number) {
        var status = 409;
        var body = '';
        var model = this;
        try{
            yield model.User.findById(userId).then(function(results:any){
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
    var status = 409;
    var body = '';
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
    userModel.findOrCreate = function * (data:any){
        var status = 409;
        var body = '';
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
            }).spread(function(user:any, created:any) {
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
    */
};

export {UsersModel};
