"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployerSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    orgName: { type: String, required: true },
    mobileNumber: { type: Number, require: true },
    password: { type: String, required: true },
    employeeType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});
exports.EmployerSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.COMPLAINFORM, schema);
