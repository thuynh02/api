abstract class ApiModel{
  databaseTable:any;
  logger:any;
  name:string;

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
                    body   = model.name+' does not exist!';
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
        console.log('model');
        try {
            console.log('populatedObject:\n', populatedObject);
            yield model.databaseTable.upsert({
            personId : data.id,
            auth0Id : data.auth0Id,
            partyId : data.partyId,
            groupId : data.groupId,
            fName   : data.fName,
            lName   : data.lName,
            cohort  : data.cohort,
            office  : data.office,
            phone  : data.phone,
            email  : data.email,
            profilePicture: data.profilePicture,
            skillsVisited : false,
            interestsVistited : false,
            infoVisited :false
        }).then(function(created:any) {
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