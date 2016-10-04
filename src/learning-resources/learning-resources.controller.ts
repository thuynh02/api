import {LearningResourcesService} from './learning-resources.service';
import {ApiController} from '../abstract-api-classes/api.controller';

var Router = require('koa-router');
var parse  = require('co-body');

class LearningResourcesController extends ApiController {
    service:LearningResourcesService;
    constructor(server_:any, routerPrefix_:string){
        super(server_, routerPrefix_, new LearningResourcesService());
        this.createAllDefaultRoutes();
        this.addRoutesToApp();
    };
};

export {LearningResourcesController}