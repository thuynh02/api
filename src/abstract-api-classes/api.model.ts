abstract class ApiModel{
  db:any;
  databaseTable:any;
  logger:any;
  name:string;

  constructor(databaseTableSchema:any){
    this.db = require('../server/sweet-skills-database');
    this.databaseTable = databaseTableSchema(this.db.sequelize, this.db.Sequelize);
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
              model.logger.info(model.name,"s retrieved");
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
                    model.logger.info(model.name,' ', id, ' retrieved');
                }
                else{
                    status = 404;
                    body   = model.name + ' ' + id + ' does not exist!';
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

  * updateById(data:any){
    var populatedObject = this.populateModelObject(data);
    var status:number, body:string;
        var model = this;
        try {
            yield model.databaseTable.upsert(populatedObject).then(function(created:any) {
            if(created) {
                status = 201;
                body = model.name + ' created!';
            }
            else {
                status = 204;
                body = model.name + ' updated!';
            }
            }, function(error:any) {
            status = 500;
            body = error;
            model.logger.error(body);
            });
        } catch(error) {
            status = 409;
            body = error;
            model.logger.error(body);
        } finally {
            return { status : status, body : body };
        }
  };

  abstract populateModelObject(data:any):any;

};

export {ApiModel};