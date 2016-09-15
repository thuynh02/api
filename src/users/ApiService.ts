import {ApiModel} from './ApiModel';
var db:any     = require('../server/sweet-skills-database');
var person:any = require('./../models/person');

abstract class ApiService{

  constructor(){
  };
  
  abstract  getAll():any;
};



export {ApiService};