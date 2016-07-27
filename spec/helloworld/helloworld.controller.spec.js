var request = require("request");

var base_url = "http://localhost:8080";
var uriPath = "/helloworld";

// Start the app
var app = require("../../app.js");

describe("Hello World Module", function () {
    describe("GET /", function () {

        // Send a request to /helloworld (OK)
        it("returns status code 200", function () {
            request.get(base_url + uriPath, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        // Send a request to / (NOT FOUND)
        it("returns status code 404", function () {
            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});