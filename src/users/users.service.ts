import {UsersModel} from './users.model';
import {ApiService} from '../abstract-api-classes/api.service';

class UsersService extends ApiService{
    model:UsersModel;
    constructor(){
        super(new UsersModel());
        this.requiredUpdateParams = ['auth0Id', 'groupId', 'fName', 'lName', 'cohort', 'office', 'phone', 'email', 'profilePicture'];
    };

    * findOrCreate(data:any){
        var validRequest   = true;
        var requiredParams = ['user_id', 'given_name', 'family_name', 'email', 'picture'];
        var missingParam   = '';

        for(let i = 0; i < requiredParams.length; i++) {
            if(!data.hasOwnProperty(requiredParams[i])) {
                missingParam = requiredParams[i];
                validRequest = false;
                break;
            }
        }
        if (!validRequest){
            return { status : 400, body: 'Missing parameter: ' + missingParam }
        }
        var response = yield this.model.findOrCreate(data);
        return response;
    };


};

export {UsersService};

