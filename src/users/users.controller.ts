"use strict"
var UsersService = require("./users.service.js");
var Router = require('koa-router');
var parse = require('co-body');

function UsersController (server){
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
        var user_id: number = this.params.user_id;
        var response = yield UsersService.getUserById(user_id);

        this.body   = response.body;
        this.status = response.status;
    });

    /*
    // findOrCreate a user based on unique identifier from auth0
    router.put('/login/:identifier', function * (){
        var data = this.params;
        var response = yield UsersService.findOrCreate(data);

        this.body   = response.body;
        this.status = response.status;
    });
    */

    router.del('/:user_id', function * (){
        var user_id :number = this.params.user_id;

        var response = yield UsersService.deleteUser(user_id);

        this.body   = response.body;
        this.status = response.status;
    });

    //Add routes to the app
    server.app.use(router.routes());
    server.app.use(router.allowedMethods());
    
    return;
}

module.exports = UsersController;
