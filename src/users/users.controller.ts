
var UsersService = require("./users.service.js");
var Router = require('koa-router');
var parse = require('co-body');

function UsersController (server){
    this.server = server;

    //Create a new router
    var router = new Router({
        prefix: '/users'
    });

    /*
    //Set up the routes to call the services
    router.put('/users/login', function * () {
        var data = yield parse(this);

        var response = yield UserService.addUser(data);

        this.body = response.body;
        this.status = response.status;
    });
    
    
    router.get('/users/:user_id', function * () {

    });

    
    router.del('/users/:user_id', function * () {
    });
    */ 
    router.get('/all', function * () {
        var response = yield new UModel('').getAllUsers();

        this.body   = response.body;
        this.status = response.status;
    });
    

    //Add routes to the app
    server.app.use(router.routes());
    server.app.use(router.allowedMethods());
    
    return;
}

module.exports = UsersController;
