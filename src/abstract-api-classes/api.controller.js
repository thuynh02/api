"use strict";
var Router = require('koa-router');
var parse = require('co-body');
var ApiController = (function () {
    function ApiController(server_, routerPrefix_, apiService_) {
        this.service = apiService_;
        this.routerPrefix = routerPrefix_;
        this.router = new Router({
            prefix: this.routerPrefix
        });
        this.server = server_;
        /*
        // findOrCreate a user based on unique identifier from auth0
        
        */
    }
    ;
    ApiController.prototype.createAllDefaultRoutes = function () {
        this.createGetAllRoute();
        this.createGetByIdRoute();
        this.createUpdateByIdRoute();
    };
    ;
    //here are the default routes
    ApiController.prototype.createGetAllRoute = function () {
        var apiController = this;
        this.router.get('/', function () {
            var response = yield apiController.service.getAll();
            this.body = response.body;
            this.status = response.status;
        });
    };
    ;
    ApiController.prototype.createGetByIdRoute = function () {
        var apiController = this;
        this.router.get('/:id', function () {
            var id = this.params.id;
            var response = yield apiController.service.getById(id);
            this.body = response.body;
            this.status = response.status;
        });
    };
    ;
    ApiController.prototype.createUpdateByIdRoute = function () {
        var apiController = this;
        apiController.router.put('/:id', function () {
            var data = yield parse(this);
            data.id = this.params.id;
            var response = yield apiController.service.updateById(data);
            this.body = response.body;
            this.status = response.status;
        });
    };
    ;
    ApiController.prototype.addRoutesToApp = function () {
        this.server.app.use(this.router.routes());
        this.server.app.use(this.router.allowedMethods());
        return;
    };
    ;
    return ApiController;
}());
exports.ApiController = ApiController;
;
