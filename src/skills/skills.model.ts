var db = require('../server/sweet-skills-database.js');
var capability = require('../models/capability.js');

function SkillsModel() {
  this.Capability = capability(db.sequelize, db.Sequelize);
  this.Capability.sync();

  this.logger = require('../server/logger.js');
}

var model = SkillsModel.prototype;

model.getAllCapabilities = function * () {
  var status, body;
  var model = this;
  try {
    yield this.Capability.findAll().then(function (results) {
      status = 200;
      body = results;
    });
  }
  catch (err) {
    status = 409;
    body = err;
    model.logger.error(body);
  }
  finally {
    return { status: status, body: body };
  }
};

model.getCapability = function * (data) {
  var status, body;
  var model = this;
  try {
    yield this.Capability.findOne({
      where : {
        capability_id: data.capability_id
      }
    }).then(function (results) {
      if(results) {
        status = 200;
        body = results;
      } else {
        status = 404;
        body = "Capability not found";
        model.logger.warn(body);
      }
    });
  }
  catch (err) {
    status = 409;
    body = err;
    model.logger.error(body);
  }
  finally {
    return { status: status, body: body };
  }
};

module.exports = SkillsModel;
