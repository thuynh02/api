var env = process.env.NODE_ENV || "development";

var pg = require('pg');
var dbConfig = require('../config.json')[env];
var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

module.exports = {
  sequelize,
  Sequelize
};
