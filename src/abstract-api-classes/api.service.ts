import {ApiModel} from './api.model';

abstract class ApiService{
  model:ApiModel;
  requiredParams:string[];

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
    
    var parameterValidation:any = this.validateParameters(data, ['id'].concat(this.requiredParams));
    if (!parameterValidation.validRequest){
      return { status : 400, body: 'Missing parameter: ' + parameterValidation.missingParam };
    };

    var response = yield this.model.updateById(data);
    return response;
  };

  * findOrCreate(data:any){
    var parameterValidation:any = this.validateParameters(data, this.requiredParams);
    if (!parameterValidation.validRequest){
      return { status : 400, body: 'Missing parameter: ' + parameterValidation.missingParam };
    };

    var response = yield this.model.findOrCreate(data);
    return response;
  };

  validateParameters(data:{}, requiredParams:string[]):any{
    var validRequest:boolean = true;
    var missingParam:string = '';

    for(var i = 0; i < requiredParams.length; i++) {
        if(!data.hasOwnProperty(requiredParams[i])) {
            missingParam = requiredParams[i];
            validRequest = false;
            break;
        }
    }
    return {validRequest : validRequest, missingParam : missingParam};
  };

};

export {ApiService};