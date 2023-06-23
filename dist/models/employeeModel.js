"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    companyId: { type: String, required: true },
    fullName: { type: String, required: false },
    orgName: { type: String, required: true },
    mobileNumber: { type: Number, require: false },
    emailId: { type: String, required: true },
    password: { type: String, required: false },
    employeeStatus: { type: String, required: true },
    userType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});
exports.EmployeesSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.ADMINDATA, schema);
