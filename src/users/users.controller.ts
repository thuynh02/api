import {UsersService} from './users.service';
import {ApiController} from '../abstract-api-classes/api.controller';

var Router = require('koa-router');
var parse  = require('co-body');

class UsersController extends ApiController {
    service:UsersService;
    constructor(server_:any, routerPrefix_:string){
        super(server_, routerPrefix_, new UsersService());
        this.createAllDefaultRoutes();
        //this.createLoginRoute();
        this.addRoutesToApp();
    };
    /*
    createLoginRoute(){
        var apiController = this;
        this.router.put('/login', function * (){
            var data     = yield parse(this);
            var response = yield apiController.service.findOrCreate(data);

            this.body    = response.body;
            this.status  = response.status;
        }); 
   };

    createFindOrCreateRoute(){
       //this is here to overrde the abstract create route to avoid the creation of users
       //without a login
   };
   */
};

export {UsersController}
