import {UsersModel} from './users.model';
import {ApiService} from './ApiService';

class UsersService extends ApiService{
    constructor(){
        var usersModel = new UsersModel;
        super(usersModel);
    };

/*
    * getUserById(userId :number) {
        var response = yield new UModel('Get one user').getUserById(userId);

        return response;
    };

    * removeUser(userId :number){
        var response = yield new UModel('Delete a user').removeUser(userId);

        return response;
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
        var response = yield new UModel().findOrCreate(data);
        return response;
    };
    */
};

export {UsersService};

