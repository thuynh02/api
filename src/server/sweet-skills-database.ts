var env = process.env.NODE_ENV || "development";

var pg = require('pg');
var Sequelize = require('sequelize');

var config = {
	"host" : process.env.PGHOST,
	"port" : process.env.PGPORT,
    "dialect" : "postgres"
}

var sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, config);

module.exports = { sequelize, Sequelize };