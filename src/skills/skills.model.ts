var db = require('../server/sweet-skills-database');
var capability = require('../models/capability');

function SkillsModel() {
  this.Capability = capability(db.sequelize, db.Sequelize);
  this.Capability.sync();

  this.logger = require('../server/logger');
}

var model = SkillsModel.prototype;

model.getAllCapabilities = function * ():any {
  var status, body;
  var model = this;

  try {
    yield this.Capability.findAll().then(function (results:any) {
      status = 200;
      body = results;
    });
  } catch (err) {
      status = 409;
      body = err;
      model.logger.error(body);
  } finally {
      return { status: status, body: body };
  }
};

model.getCapability = function * (data:JSON) {
  var status, body;
  var model = this;

  try {
    yield this.Capability.findOne({
      where : {
        capabilityId: data.capabilityId
      }
    }).then(function (results:any) {
      if(results) {
        status = 200;
        body = results;
      } else {
        status = 404;
        body = 'Capability not found';
        model.logger.warn(body);
      }
    });
  } catch (err) {
      status = 409;
      body = err;
      model.logger.error(body);
  } finally {
      return { status: status, body: body };
  }
};

model.addCapability = function * (data:JSON) {
  var status, body;
  var model = this;

  try {
    yield this.Capability.findOrCreate({
      where : {
        capName : data.capName
      },
      defaults : {
        partyId : data.partyId,
        capName : data.capName,
        category : data.category,
        skill : data.skill,
        type : data.type
      }
    }).spread(function(cap:any, created:any) {
      if(created) {
        status = 201;
        body = cap;
      } else {
        status = 400;
        body = 'Capability already exists!';
        model.logger.warn(body);
      }
    });
  } catch(err) {
      status = 409;
      body = err;
      model.logger.error(body);
  } finally {
      return { status : status, body : body };
  }
};

model.updateCapability = function * (data:JSON) {
  var status, body;
  var model = this;

  try {
    yield this.Capability.upsert({
      capabilityId: data.capabilityId,
      partyId : data.partyId,
      capName : data.capName,
      category: data.category,
      skill: data.skill,
      type: data.type
    }).then(function(created:any) {
      if(created) {
        status = 201;
        body = 'Capability created!';
      }
      else {
        status = 204;
        body = 'Capability updated!';
      }
    }, function(error:any) {
      status = 500;
      body = error;
      model.logger.error(body);
    });
  } catch(error) {
      status = 409;
      body = error;
      this.logger.error(body);
  } finally {
      return { status : status, body : body };
  }
};

model.deleteCapability = function * (data:JSON) {
  var status, body;
  var model = this;

  try {
    yield this.Capability.destroy({
      where: {
        capabilityId : data.capabilityId
      }
    }).then(function(deletedRows:any){
      if(deletedRows) {
        status = 204;
        body = 'Capability: ' + data.capabilityId + ' was deleted';
      } else {
        status = 409;
        body = 'Capability: ' + data.capabilityId + ' was not deleted';
        model.logger.warn(body);
      }
    });
  } catch(err) {
      status = 409;
      body = err;
      this.logger.error(body);
  } finally {
      return { status : status, body : body };
  }
};

module.exports = SkillsModel;
