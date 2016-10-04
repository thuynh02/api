import {LearningResourcesModel} from './learning-resources.model';
import {ApiService} from '../abstract-api-classes/api.service';

class LearningResourcesService extends ApiService{
    model:LearningResourcesModel;
    constructor(){
        super(new LearningResourcesModel());
        this.requiredUpdateParams = [
            'id',
            'type',
            'title',
            'author',
            'description',
            'userLvl',
            'isRecommended'
        ];
    };
};

export {LearningResourcesService};