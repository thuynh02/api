var db = require('../server/sweet-skills-database');
var capability = require('../models/capability');

function SkillsModel() {
  this.Capability = capability(db.sequelize, db.Sequelize);
  this.Capability.sync();

  this.logger = require('../server/logger');
}

var skillsModel = SkillsModel.prototype;

skillsModel.getAllCapabilities = function * ():any {
  var status:number, body:string;
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

skillsModel.getCapability = function * (data:any) {
  var status:number, body:string;
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

skillsModel.addCapability = function * (data:any) {
  var status:number, body:string;
  var model = this;

  try {
    yield this.Capability.findOrCreate({
      where : {
        capabilityName : data.capabilityName
      },
      defaults : {
        partyId : data.partyId,
        capabilityName : data.capabilityName,
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

skillsModel.updateCapability = function * (data:any) {
  var status:number, body:string;
  var model = this;

  try {
    yield this.Capability.upsert({
      capabilityId: data.capabilityId,
      partyId : data.partyId,
      capabilityName : data.capabilityName,
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

skillsModel.deleteCapability = function * (data:any) {
  var status:number, body:string;
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
