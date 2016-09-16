import {ApiService} from './ApiService';

var Router = require('koa-router');
var parse  = require('co-body');

abstract class ApiController {
  server:any;
  router:any;
  service:ApiService;
  routerPrefix:string;

  constructor(server_:any, routerPrefix_:string, apiService_:ApiService){
    this.service = apiService_;
    this.routerPrefix = routerPrefix_;
    this.router = new Router({
      prefix: this.routerPrefix
    });
    this.server = server_;
    /*
    // findOrCreate a user based on unique identifier from auth0
    
    */
  };

  createAllDefaultRoutes(){
    this.createGetAllRoute();
    this.createGetByIdRoute();
    //this.createUpdateByIdRoute();
  };

  //here are the default routes
  private createGetAllRoute(){
    var apiController = this;
    this.router.get('/', function * () {
      var response = yield apiController.service.getAll();
      this.body   = response.body;
      this.status = response.status;
    });
  };

  private createGetByIdRoute(){
    var apiController = this;
    this.router.get('/:id', function * (){
      var id:number = this.params.id;
      var response = yield apiController.service.getById(id);

      this.body    = response.body;
      this.status  = response.status;
    });
  };

  
/*
  private createPostRoute(){

  };
*/
  addRoutesToApp(){
    this.server.app.use(this.router.routes());
    this.server.app.use(this.router.allowedMethods());
    return;
  };

};

export {ApiController};