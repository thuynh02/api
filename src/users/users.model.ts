var db   = require('../server/sweet-skills-database.js');
var user = require('../models/person.js');


function UsersModel(message){
    this.message = message;
    this.User    = user(db.sequelize, db.Sequelize);
    this.logger  = require('../server/logger.js');
}

var model = UsersModel.prototype;

//Query database and return an http status code
model.addUser =  function * (data) {
    var status, body;
    var model = this;
    try {
        yield this.User.findOrCreate({
            where : {
                user_name : data.user_name
            },
            defaults : {
                group_id : data.group_id,
                f_name : data.f_name,
                l_name : data.l_name,
                cohort : data.cohort,
                office : data.office
            }
        }).spread(function(user, created){
            if(created) {
                status = 201;
                body   = user;
            } else {
                status = 400;
                body   = 'Capability already exists';
                model.logger.warn(body);
            }
        });
    } catch (err) {
        status = 409;
        var error = err;
    } finally{
        return {status : status, body : body};
    }
};

model.getAllUsers = function * (data){
    var status, body;
    var model = this;
    try{
        yield this.User.findAll().then(function(results){
            status = 200;
            body   = results;
            model.logger.info("Users retrieved");
        });
    } catch(err) {
        status = 409;
        body   = err;
        this.logger.error(body);
    } finally{
        return { status : status, body : body };
    }
};

model.exports = UsersModel;

