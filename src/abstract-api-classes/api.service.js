"use strict";
var ApiService = (function () {
    function ApiService(apiModel_) {
        this.model = apiModel_;
    }
    ;
    ApiService.prototype.getAll = function () {
        var response = yield this.model.getAll();
        return response;
    };
    ;
    ApiService.prototype.getById = function (id) {
        var response = yield this.model.getById(id);
        return response;
    };
    ;
    ApiService.prototype.updateById = function (data) {
        var validRequest = true;
        var requiredParams = this.requiredUpdateParams;
        var missingParam = '';
        // Validate required parameters
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
        var response = yield this.model.updateById(data);
        return response;
    };
    ;
    return ApiService;
}());
exports.ApiService = ApiService;
;
