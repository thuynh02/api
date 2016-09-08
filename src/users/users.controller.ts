'use strict'

var UsersService = require('./users.service');
var Router = require('koa-router');
var parse = require('co-body');

function UsersController (server:any){
    this.server = server;

    //Create a new router
    var router = new Router({
        prefix: '/users'
    });

    //Set up the routes

    //all the users
    router.get('/', function * () {
        var response = yield UsersService.getAllUsers();
        
        this.body   = response.body;
        this.status = response.status;
    });

    //user by Id
    router.get('/:user_id', function * (){
        var userId: number = this.params.user_id;
        var response = yield UsersService.getUserById(userId);

        this.body    = response.body;
        this.status  = response.status;
    });

    
    // findOrCreate a user based on unique identifier from auth0
    router.put('/login', function * (){
        var data     = yield parse(this);
        var response = yield UsersService.findOrCreate(data);

        this.body    = response.body;
        this.status  = response.status;
    });
    
    //Currently the delete functionality is not callable because 
    //there are other tables with the user as a foreign key that 
    //we don't want to cascade to. We need to either refactor the
    //database, make deleting into more of a shut-off, or both
    /*
    router.del('/:user_id', function * (){
        var userId :number = this.params.user_id;

        var response = yield UsersService.removeUser(userId);

        this.body   = response.body;
        this.status = response.status;
    });
    */

    //Add routes to the app
    server.app.use(router.routes());
    server.app.use(router.allowedMethods());
    
    return;
}



module.exports = UsersController;
