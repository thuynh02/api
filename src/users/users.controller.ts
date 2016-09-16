import {UsersService} from './users.service';
import {ApiController} from './ApiController';

var Router = require('koa-router');
var parse  = require('co-body');

class UsersController extends ApiController {

    constructor(server_:any, routerPrefix_:string){
        var usersService_ = new UsersService();
        super(server_, routerPrefix_, usersService_);
        console.log('logging service\n',this.service);
        this.addRoutesToApp();
        this.createDefaultRoutes();
    };
    
    //Currently the delete functionality is not callable because 
    //there are other tables with the user as a foreign key that 
    //we don't want to cascade to. We need to either refactor the
    //database, make deleting into more of a shut-off, or both
    /*
    router.del('/:user_id', function * (){
        var userId :number = this.params.user_id;

        var response = yield myUsersService.removeUser(userId);

        this.body   = response.body;
        this.status = response.status;
    });
    */
};

export {UsersController}
