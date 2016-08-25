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

  router.post('/', function * () {
    var data = yield parse(this);

    var response = yield SkillsService.addCapability(data);

    this.body = response.body;
    this.status = response.status;
  });

  router.put('/:capability_id', function * () {
    var data = yield parse(this);
    data.capability_id = this.params.capability_id;

    var response = yield SkillsService.updateCapability(data);

    this.body = response.body;
    this.status = response.status;
  });

  router.del('/:capability_id', function * () {
    var data = this.params;

    var response = yield SkillsService.deleteCapability(data);

    this.body = response.body;
    this.status = response.status;
  });

  // Add routes to the app
  server.app.use(router.routes());
  server.app.use(router.allowedMethods());

  return;
}

module.exports = SkillsController;
