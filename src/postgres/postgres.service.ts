'use strict';
var pg = require('pg');

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack)
})

var pool = new pg.Pool({
  user: 'sweetskillsUser',
  password: 'Pariveda1',
  host: 'personal-sweetskillsdb-pauly.ciomibwrmoaq.us-east-1.rds.amazonaws.com',
  database: 'sweetskillsdb',
});

pool.on('error', function(e, client) {
  console.log('Pool Error: ', e);
});

function PostgresService() { }

PostgresService.prototype.getAllCapability = new Promise(function (resolve, reject) {
    pool.query('SELECT * from capability', function (err, res){
      if(err) {
        reject({ status : 409, body : err});
      }
      resolve({ status : 200, body : res});
    });
});

module.exports = PostgresService;
