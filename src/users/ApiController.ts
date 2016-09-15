import {ApiService} from './ApiService';

var Router = require('koa-router');
var parse  = require('co-body');

abstract class ApiController {
  server:any;
  router:any;
  myApiService:ApiService;

  routerPrefix:string;
  constructor(server_:any){
    this.router = new Router({
      prefix: this.routerPrefix
    });

    //set up the routes
    this.router.get('/', function * () {
      var response = yield this.myApiService.getAll();

      this.body   = response.body;
      this.status = response.status;
    });
    /*
    //user by Id
    this.router.get('/:id', function * (){
      var id:number = this.params.id;
      var response = yield myApiService.getById(id);

      this.body    = response.body;
      this.status  = response.status;
    });

    
    // findOrCreate a user based on unique identifier from auth0
    this.router.put('/login', function * (){
      var data     = yield parse(this);
      var response = yield myApiService.findOrCreate(data);

      this.body    = response.body;
      this.status  = response.status;
    });
 */
    this.server = server_;
    
  };

  addRoutesToApp(){
    this.server.app.use(this.router.routes());
    this.server.app.use(this.router.allowedMethods());
    return;
  };

}

export {ApiController};