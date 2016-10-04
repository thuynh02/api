import {ApiModel} from './api.model';

abstract class ApiService{
  model:ApiModel;
  requiredUpdateParams:string[];

  constructor(apiModel_:ApiModel){
    this.model = apiModel_;
  };
  
  * getAll():any{
      var response = yield this.model.getAll();
      return response;
  };

  * getById(id:number):any{
    var response = yield this.model.getById(id);
    return response;
  };

  * updateById(data:any):any{
    var validRequest = true;
    var requiredParams = this.requiredUpdateParams;
    var missingParam = '';

    // Validate required parameters
    for(var i = 0; i < requiredParams.length; i++) {
        if(!data.hasOwnProperty(requiredParams[i])) {
            missingParam = requiredParams[i];
            validRequest = false;
            break;
        }
    }

    if(!validRequest) {
        return { status : 400, body: 'Missing parameter: ' + missingParam }
    }

    var response = yield this.model.updateById(data);
    return response;
  };

};



export {ApiService};