import {GroupsService} from './groups.service';
import {ApiController} from '../abstract-api-classes/api.controller';

var Router = require('koa-router');
var parse  = require('co-body');

class GroupsController extends ApiController {
    service:GroupsService;
    constructor(server_:any, routerPrefix_:string){
        super(server_, routerPrefix_, new GroupsService());
        this.createAllDefaultRoutes();
        this.addRoutesToApp();
    };
};

export {GroupsController}