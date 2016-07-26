var db = require('../server/sweet-skills-database.js');

// Define the table schema

module.exports = db.sequelize.define('users', {
      user_id : {
        type : db.Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
      },
      username : {
        type : db.Sequelize.STRING
      },
      email : {
        type : db.Sequelize.STRING
      },
      first_name : {
        type : db.Sequelize.STRING
      },
      last_name : {
        type : db.Sequelize.STRING
      }
    }, {
      freezeTableName : true,
      underscored : true
    }
  );