var project = require('./../models/project');
import {ApiModel} from '../abstract-api-classes/api.model';

class ProjectsModel extends ApiModel{
    constructor(){
        super(project);
        this.name = 'Project';
    };

    populateDbKey(data:any):any{
        return this.populateDefaultFields;
    };

    populateDefaultFields(data:any):any{
        return {
            groupId : data.groupId,
            oic : data.oic,
            name : data.name,
            description : data.description,
            office : data.office,
        }
    };

    //This populates the data that the updateById function needs to insert into the DB
    populateFullObject(data:any):any{
        return {
            projectId : data.id,
            groupId : data.groupId,
            oic : data.oic,
            name : data.name,
            description : data.description,
            office : data.office,
        }
    };
};

export {ProjectsModel};
