"use strict";

var ExampleService = require("./example.service.js");
var Router = require('koa-router');
var parse = require('co-body');

function ExampleController (server) {
  this.server = server;

  // Create a new router
  var router = new Router({
    prefix: '/example'
  });

  // Set up routes to call the services
  router.get('/', function * () {
    var response = yield ExampleService.getAllUsers();

    this.body = response.body;
    this.status = response.status;
  });

  router.post('/', function * () {
    var data = yield parse(this);

    var response = yield ExampleService.addUser(data);

    this.body = response.body;
    this.status = response.status;
  });

  router.del('/:user_id', function * () {
    var data = this.params;

    var response = yield ExampleService.deleteUser(data);

    this.body = response.body;
    this.status = response.status;
  });

  router.put('/:user_id', function * () {
    var data = yield parse(this);
    data.user_id = this.params.user_id;

    var response = yield ExampleService.updateUser(data);

    this.body = response.body;
    this.status = response.status;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return;
}

module.exports = ExampleController;