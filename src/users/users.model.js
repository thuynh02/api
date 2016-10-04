"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var db = require('../server/sweet-skills-database');
var person = require('./../models/person');
var api_model_1 = require('../abstract-api-classes/api.model');
var UsersModel = (function (_super) {
    __extends(UsersModel, _super);
    function UsersModel() {
        _super.call(this, db, person);
        this.name = 'user';
    }
    ;
    UsersModel.prototype.findOrCreate = function (data) {
        var status = 409;
        var body = '';
        var model = this;
        try {
            yield model.databaseTable.findOrCreate({
                where: {
                    auth0Id: data.user_id
                },
                defaults: {
                    auth0Id: data.user_id,
                    fName: data.given_name,
                    lName: data.family_name,
                    email: data.email,
                    profilePicture: data.picture,
                    groupId: 1
                }
            }).spread(function (user, created) {
                if (created) {
                    status = 201;
                    body = user;
                }
                else {
                    status = 200;
                    body = user;
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
    //This populates the data that the updateById function needs to insert into the DB
    UsersModel.prototype.populateModelObject = function (data) {
        return {
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
        };
    };
    ;
    return UsersModel;
}(api_model_1.ApiModel));
exports.UsersModel = UsersModel;
;
