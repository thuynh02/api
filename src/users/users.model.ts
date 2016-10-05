var person = require('./../models/person');
import {ApiModel} from '../abstract-api-classes/api.model';

class UsersModel extends ApiModel{
    constructor(){
        super(person);
        this.name = 'user';
    };
    
    populateDbKey(data:any):any{
        return {auth0Id : data.user_id};
    };

    populateDefaultFields(data:any):any{
        return {
            auth0Id : data.user_id,
            fName   : data.given_name,
            lName   : data.family_name,
            email   : data.email,
            profilePicture : data.picture,
            groupId : 1
        };
    };

    //This populates the data that the updateById function needs to insert into the DB
    populateFullObject(data:any):any{
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
