var SkillsService = require('./skills.service');
var Router = require('koa-router');
var parse = require('co-body');

function SkillsController (server:any) {
  this.server = server;

  // Create a new router
  var router = new Router({
    prefix: '/skills'
  });

  // Set up routes to call the services
  router.get('/', function * ():any {
    var response = yield SkillsService.getAllCapabilities();

    this.body = response.body;
    this.status = response.status;
  });

  router.get('/:capabilityId', function * ():any {
    var data = this.params;

    var response = yield SkillsService.getCapability(data);

    this.body = response.body;
    this.status = response.status;
  });

  router.post('/', function * ():any {
    var data = yield parse(this);

    var response = yield SkillsService.addCapability(data);

    this.body = response.body;
    this.status = response.status;
  });

  router.put('/:capabilityId', function * ():any {
    var data = yield parse(this);
    data.capabilityId = this.params.capabilityId;

    var response = yield SkillsService.updateCapability(data);

    this.body = response.body;
    this.status = response.status;
  });

  router.del('/:capabilityId', function * ():any {
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
