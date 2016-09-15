class ApiModel{
  databaseObject:any;
  logger:any;


  constructor(db:any, databaseObjectSchema:any){
    this.databaseObject = databaseObjectSchema(db.sequelize, db.Sequelize);
    this.logger = require('../server/logger');
  };

  * getAll(){
      var status = 409;
      var body = '';
      try{
          yield this.databaseObject.findAll().then(function(results:any){
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