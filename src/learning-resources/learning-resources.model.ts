var learningResource = require('./../models/educ_mtl');
import {ApiModel} from '../abstract-api-classes/api.model';

class LearningResourcesModel extends ApiModel{
    constructor(){
        super(learningResource);
        this.name = 'Learning Resource';
    };

    populateDbKey(data:any):any{
        return{
            title: data.title,
            author: data.author
        }
    };

    populateDefaultFields(data:any):any{
        return{
            partyId : data.partyId,
            submittedBy : data.submittedBy,
            type : data.type,
            title : data.partyId,
            author : data.author,
            description   : data.description,
            userLvl   : data.userLvl,
            isRecommended  : data.isRecommended
        }
    }

    //This populates the data that the updateById function needs to insert into the DB
    populateFullObject(data:any):any{
        return {
            educMtlId : data.id,
            partyId : data.partyId,
            submittedBy : data.submittedBy,
            type : data.type,
            title : data.partyId,
            author : data.author,
            description   : data.description,
            userLvl   : data.userLvl,
            isRecommended  : data.isRecommended
        }
    };
};

export {LearningResourcesModel};
