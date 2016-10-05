import {ProjectsService} from './projects.service';
import {ApiController} from '../abstract-api-classes/api.controller';

var Router = require('koa-router');
var parse  = require('co-body');

class ProjectsController extends ApiController {
    service:ProjectsService;
    constructor(server_:any, routerPrefix_:string){
        super(server_, routerPrefix_, new ProjectsService());
        this.createAllDefaultRoutes();
        this.addRoutesToApp();
    };
};

export {ProjectsController}