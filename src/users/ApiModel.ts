abstract class ApiModel{
  databaseTable:any;
  logger:any;

  constructor(db:any, databaseTableSchema:any){
    this.databaseTable = databaseTableSchema(db.sequelize, db.Sequelize);
    this.logger = require('../server/logger');
  };

  * getAll():any{
      var status = 409;
      var body = '';
      try{
          yield this.databaseTable.findAll().then(function(results:any){
              status = 200;
              body   = results;
              this.logger.info("Users retrieved");
              });
      } catch(err) {
          status = 409;
          body   = err;
          this.logger.error(body);
      } finally{
          return { status : status, body : body };
      }
  };
};

export {ApiModel};