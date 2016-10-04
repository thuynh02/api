"use strict";
var ApiModel = (function () {
    function ApiModel(db, databaseTableSchema) {
        this.databaseTable = databaseTableSchema(db.sequelize, db.Sequelize);
        this.logger = require('../server/logger');
    }
    ;
    ApiModel.prototype.getAll = function () {
        var status = 409;
        var body = '';
        var model = this;
        try {
            yield model.databaseTable.findAll().then(function (results) {
                status = 200;
                body = results;
                model.logger.info(model.name, "s retrieved");
            });
        }
        catch (err) {
            status = 409;
            body = err;
            model.logger.error(body);
        }
        finally {
            return { status: status, body: body };
        }
    };
    ;
    ApiModel.prototype.getById = function (id) {
        var status = 409;
        var body = '';
        var model = this;
        try {
            yield model.databaseTable.findById(id).then(function (results) {
                if (results != null) {
                    status = 200;
                    body = results;
                    model.logger.info(model.name, ' ', id, ' retrieved');
                }
                else {
                    status = 404;
                    body = model.name + ' does not exist!';
                }
            });
        }
        catch (err) {
            status = 409;
            body = err;
            model.logger.error(body);
        }
        finally {
            return { status: status, body: body };
        }
    };
    ;
    ApiModel.prototype.updateById = function (data) {
        var populatedObject = this.populateModelObject(data);
        var status, body;
        var model = this;
        console.log('model');
        try {
            console.log('populatedObject:\n', populatedObject);
            yield model.databaseTable.upsert({
                personId: data.id,
                auth0Id: data.auth0Id,
                partyId: data.partyId,
                groupId: data.groupId,
                fName: data.fName,
                lName: data.lName,
                cohort: data.cohort,
                office: data.office,
                phone: data.phone,
                email: data.email,
                profilePicture: data.profilePicture,
                skillsVisited: false,
                interestsVistited: false,
                infoVisited: false
            }).then(function (created) {
                if (created) {
                    status = 201;
                    body = name + ' created!';
                }
                else {
                    status = 204;
                    body = name + ' updated!';
                }
            }, function (error) {
                status = 500;
                body = error;
                model.logger.error(body);
            });
        }
        catch (error) {
            status = 409;
            body = error;
            model.logger.error(body);
        }
        finally {
            return { status: status, body: body };
        }
    };
    ;
    return ApiModel;
}());
exports.ApiModel = ApiModel;
;
