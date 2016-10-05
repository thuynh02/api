import {UsersModel} from './users.model';
import {ApiService} from '../abstract-api-classes/api.service';

class UsersService extends ApiService{
    model:UsersModel;
    constructor(){
        super(new UsersModel());
        this.requiredParams = ['auth0Id', 'groupId', 'fName', 'lName', 'cohort', 'office', 'phone', 'email', 'profilePicture'];
    };

     * findOrCreate(data:any){
        var requiredParams = ['user_id', 'given_name', 'family_name', 'email', 'picture'];
        var parameterValidation:any = this.validateParameters(data, requiredParams);
        if (!parameterValidation.validRequest){
        return { status : 400, body: 'Missing parameter: ' + parameterValidation.missingParam };
        };

        var response = yield this.model.findOrCreate(data);
        return response;
    };
};

export {UsersService};

