var project = require('./../models/project');
import {ApiModel} from '../abstract-api-classes/api.model';

class ProjectsModel extends ApiModel{
    constructor(){
        super(project);
        this.name = 'Project';
    };

    //This populates the data that the updateById function needs to insert into the DB
    populateModelObject(data:any):any{
        return {
            projectId : data.id,
            oic : data.oic,
            name : data.name,
            description : data.description,
            office : data.office,
        }
    };
};

export {ProjectsModel};
