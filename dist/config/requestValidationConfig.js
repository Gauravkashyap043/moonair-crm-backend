"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidationConfig = void 0;
var express_validator_1 = require("express-validator");
exports.requestValidationConfig = {
    employerRegister: [
        (0, express_validator_1.body)("fullName", "Please enter valid name.").exists(),
        (0, express_validator_1.body)("mobileNumber", "Enter a valid mobile number").isLength({
            min: 10,
            max: 10,
        }),
        (0, express_validator_1.body)("password", "Password should be minimum 6 characters.")
            .exists()
            .isLength({ min: 6 }),
        (0, express_validator_1.body)("orgName").exists(),
    ],
    employerLogin: [
        (0, express_validator_1.body)("mobileNumber", "Enter a valid mobile number").isLength({
            min: 10,
            max: 10,
        }),
        (0, express_validator_1.body)("password", "Password should be minimum 6 characters."),
    ],
    createEmployee: [(0, express_validator_1.body)("emailId", "Enter a valid emailId.").isEmail()],
    employeeAuth: [
        (0, express_validator_1.body)("fullName", "Enter a valid full name").isLength({
            min: 3,
        }),
        (0, express_validator_1.body)("emailId", "Enter a valid emailId.").isEmail(),
        (0, express_validator_1.body)("password", "Password should be minimum 6 characters.").isLength({
            min: 6,
        }),
        (0, express_validator_1.body)("mobileNumber", "Enter a valid mobile number").isLength({
            min: 10,
            max: 10,
        }),
    ],
};
