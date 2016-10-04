var db     = require('../server/sweet-skills-database');
var person = require('./../models/person');
import {ApiModel} from '../abstract-api-classes/api.model';

class UsersModel extends ApiModel{
    constructor(){
        super(db, person);
        this.name = 'user';
    };

    * findOrCreate(data:any):any{
        var status = 409;
        var body = '';
        var model = this;
        try{
            yield model.databaseTable.findOrCreate({
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

    //This populates the data that the updateById function needs to insert into the DB
    populateModelObject(data:any):any{
        return {
            personId : data.id,
            auth0Id : data.auth0Id,
            partyId : data.partyId,
            groupId : data.groupId,
            fName   : data.fName,
            lName   : data.lName,
            cohort  : data.cohort,
            office  : data.office,
            phone  : data.phone,
            email  : data.email,
            profilePicture: data.profilePicture,
            skillsVisited : false,
            interestsVistited : false,
            infoVisited :false
        }
    };
};

export {UsersModel};
