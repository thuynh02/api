var env = process.env.NODE_ENV || "development";

var pg = require('pg');
/*var dbConfig = require('../config.json')[env];*/
var Sequelize = require('sequelize');

var config = {
	"host" : process.env.PGHOST,
	"port" : process.env.PGPORT,
    "dialect" : "postgres"
}
/*
console.log("PGHOST: ", process.env.PGHOST);
console.log("PGPORT: ", process.env.PGPORT);
console.log("PGUSER: ", process.env.PGUSER);
console.log("PGPASSWORD: ", process.env.PGPASSWORD);
console.log("PGDATABASE: ", process.env.PGDATABASE);
*/
var sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, config);

module.exports = { sequelize, Sequelize };