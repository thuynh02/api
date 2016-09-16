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
      var model = this;
      try{
          yield model.databaseTable.findAll().then(function(results:any){
              status = 200;
              body   = results;
              model.logger.info("Users retrieved");
              });
      } catch(err) {
          status = 409;
          body   = err;
          model.logger.error(body);
      } finally{
          return { status : status, body : body };
      }
  };

  * getById(id:number):any{
        var status = 409;
        var body = '';
        var model = this;
        try{
            yield model.databaseTable.findById(id).then(function(results:any){
                if (results!=null){
                    status = 200;
                    body   = results;
                    model.logger.info('User ', id, ' retrieved');
                }
                else{
                    status = 404;
                    body   = 'User does not exist!';
                }
            
            });
        } catch(err) {
            status = 409;
            body   = err;
            model.logger.error(body);
        } finally {
            return { status : status, body : body };
        }
  };

};

export {ApiModel};