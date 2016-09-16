import {ApiModel} from './ApiModel';
var db:any     = require('../server/sweet-skills-database');
var person:any = require('./../models/person');

abstract class ApiService{
  apiModel:ApiModel;
  constructor(apiModel_:ApiModel){
    this.apiModel = apiModel_;
  };
  
  * getAll():any{
      console.log('Hello from users service get all\n');
      var response = yield this.apiModel.getAll();
      return response;
  }
};



export {ApiService};