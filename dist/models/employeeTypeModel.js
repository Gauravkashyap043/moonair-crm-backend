"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeTypeSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    type: { type: String, required: true },
    isActive: { type: Boolean, default: false },
});
exports.EmployeeTypeSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.EMPLOYEE_TYPE, schema);
