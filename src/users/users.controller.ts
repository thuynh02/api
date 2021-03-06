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

    //override the creation to point at users/login
    createFindOrCreateRoute(){
        var apiController = this;
        apiController.router.post('/login', function * (){
        var data = yield parse(this);
        var response = yield apiController.service.findOrCreate(data);

        this.body    = response.body;
        this.status  = response.status;
    });
  };
   
};

export {UsersController}
