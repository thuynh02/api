"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var users_service_1 = require('./users.service');
var api_controller_1 = require('../abstract-api-classes/api.controller');
var Router = require('koa-router');
var parse = require('co-body');
var UsersController = (function (_super) {
    __extends(UsersController, _super);
    function UsersController(server_, routerPrefix_) {
        _super.call(this, server_, routerPrefix_, new users_service_1.UsersService());
        this.createAllDefaultRoutes();
        this.createLoginRoute();
        this.addRoutesToApp();
    }
    ;
    UsersController.prototype.createLoginRoute = function () {
        var apiController = this;
        this.router.put('/login', function () {
            var data = yield parse(this);
            var response = yield apiController.service.findOrCreate(data);
            this.body = response.body;
            this.status = response.status;
        });
    };
    ;
    return UsersController;
}(api_controller_1.ApiController));
exports.UsersController = UsersController;
;
