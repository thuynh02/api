var db = require('../server/sweet-skills-database.js');
var capability = require('./../models/capability.js');

function SkillsModel(message) {
  this.message = message;
  this.Capability = capability(db.sequelize, db.Sequelize);
  this.logger = require('../server/logger.js');
  //this.Capability.sync();
}

var model = SkillsModel.prototype;

module.exports = SkillsModel;