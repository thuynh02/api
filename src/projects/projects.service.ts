import {ProjectsModel} from './projects.model';
import {ApiService} from '../abstract-api-classes/api.service';

class ProjectsService extends ApiService{
    model:ProjectsModel;
    constructor(){
        super(new ProjectsModel());
        this.requiredParams = [
            'oic',
            'groupId',
            'name',
            'description',
            'office'
        ];
    };
};

export {ProjectsService};