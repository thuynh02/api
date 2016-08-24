"use strict";

var SkillsService = require("./skills.service.js");
var Router = require('koa-router');
var parse = require('co-body');

function SkillsController (server) {
  this.server = server;

  // Create a new router
  var router = new Router({
    prefix: '/skills'
  });

  // Set up routes to call the services
  router.get('/', function * () {
    var response = yield SkillsService.getAllCapabilities();

    this.body = response.body;
    this.status = response.status;
  });

  router.get('/:capability_id', function * () {
    var data = this.params;

    var response = yield SkillsService.getCapability(data);

    this.body = response.body;
    this.status = response.status;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return;
}

module.exports = SkillsController;
