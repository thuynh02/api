import {ApiModel} from './ApiModel';
var db:any     = require('../server/sweet-skills-database');
var person:any = require('./../models/person');

abstract class ApiService{
  model:ApiModel;
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
};



export {ApiService};