"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var users_model_1 = require('./users.model');
var api_service_1 = require('../abstract-api-classes/api.service');
var UsersService = (function (_super) {
    __extends(UsersService, _super);
    function UsersService() {
        _super.call(this, new users_model_1.UsersModel());
        this.requiredUpdateParams = ['auth0Id', 'groupId', 'fName', 'lName', 'cohort', 'office', 'phone', 'email', 'profilePicture'];
    }
    ;
    UsersService.prototype.findOrCreate = function (data) {
        var validRequest = true;
        var requiredParams = ['user_id', 'given_name', 'family_name', 'email', 'picture'];
        var missingParam = '';
        for (var i = 0; i < requiredParams.length; i++) {
            if (!data.hasOwnProperty(requiredParams[i])) {
                missingParam = requiredParams[i];
                validRequest = false;
                break;
            }
        }
        if (!validRequest) {
            return { status: 400, body: 'Missing parameter: ' + missingParam };
        }
        var response = yield this.model.findOrCreate(data);
        return response;
    };
    ;
    return UsersService;
}(api_service_1.ApiService));
exports.UsersService = UsersService;
;
