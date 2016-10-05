import {GroupsModel} from './groups.model';
import {ApiService} from '../abstract-api-classes/api.service';

class GroupsService extends ApiService{
    model:GroupsModel;
    constructor(){
        super(new GroupsModel());
        this.requiredParams = [
            'name'
        ];
    };
};

export {GroupsService};