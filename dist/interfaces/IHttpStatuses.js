"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatuses = void 0;
var HttpStatuses;
(function (HttpStatuses) {
    HttpStatuses[HttpStatuses["OK"] = 200] = "OK";
    HttpStatuses[HttpStatuses["CREATED"] = 201] = "CREATED";
    HttpStatuses[HttpStatuses["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatuses[HttpStatuses["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatuses[HttpStatuses["CONFLICT"] = 409] = "CONFLICT";
    HttpStatuses[HttpStatuses["MOVED"] = 309] = "MOVED";
})(HttpStatuses || (exports.HttpStatuses = HttpStatuses = {}));
