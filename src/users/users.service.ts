import {UsersModel} from './users.model';
import {ApiService} from '../abstract-api-classes/api.service';

class UsersService extends ApiService{
    model:UsersModel;
    constructor(){
        super(new UsersModel());
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
    /* Currently Broken
    * updateById(data:any):any{
        var validRequest = true;
        var requiredParams = ['personId', 'auth0Id', 'groupId', 'fName', 'lName', 'cohort', 'office', 'phone', 'email', 'profilePicture'];

        var missingParam = '';

        // Validate required parameters
        for(var i = 0; i < requiredParams.length; i++) {
            if(!data.hasOwnProperty(requiredParams[i])) {
                missingParam = requiredParams[i];
                validRequest = false;
                break;
            }
        }

        if(!validRequest) {
            return { status : 400, body: 'Missing parameter: ' + missingParam }
        }

        var response = yield this.model.updateById(data);
        return response;
    };
    */

};

export {UsersService};

