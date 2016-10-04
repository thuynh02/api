var group = require('./../models/group');
import {ApiModel} from '../abstract-api-classes/api.model';

class GroupsModel extends ApiModel{
    constructor(){
        super(group);
        this.name = 'Group';
    };

    //This populates the data that the updateById function needs to insert into the DB
    populateModelObject(data:any):any{
        return {
            groupId : data.id,
            name : data.name
        }
    };
};

export {GroupsModel};
