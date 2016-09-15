import {ApiModel} from './ApiModel'
var db:any     = require('../server/sweet-skills-database');
var person:any = require('./../models/person');

class ApiService{
  myApiModel:ApiModel;
  apiName:string;

  constructor(){
  };
  
  * getAll() {
    var response = yield new ApiModel(db, person).getAll();
  };
};

export {ApiService};