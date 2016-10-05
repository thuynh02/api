import {ApiService} from './api.service';

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
  };

  createAllDefaultRoutes(){
    this.createGetAllRoute();
    this.createGetByIdRoute();
    this.createUpdateByIdRoute();
    this.createFindOrCreateRoute();
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

  private createUpdateByIdRoute(){
    var apiController = this;
    apiController.router.put('/:id', function * (){
      var data = yield parse(this);
      data.id = this.params.id;
      var response = yield apiController.service.updateById(data);

      this.body    = response.body;
      this.status  = response.status;
    });
  };

private createFindOrCreateRoute(){
    var apiController = this;
    apiController.router.post('/', function * (){
      var data = yield parse(this);
      var response = yield apiController.service.findOrCreate(data);

      this.body    = response.body;
      this.status  = response.status;
    });
  };

  addRoutesToApp(){
    this.server.app.use(this.router.routes());
    this.server.app.use(this.router.allowedMethods());
    return;
  };

};

export {ApiController};