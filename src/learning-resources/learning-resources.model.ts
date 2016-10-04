var learningResource = require('./../models/educ_mtl');
import {ApiModel} from '../abstract-api-classes/api.model';

class LearningResourcesModel extends ApiModel{
    constructor(){
        super(learningResource);
        this.name = 'Learning Resource';
    };

    //This populates the data that the updateById function needs to insert into the DB
    populateModelObject(data:any):any{
        return {
            educMtlId : data.id,
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
