"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var auth_controller_1 = require("../controllers/auth.controller");
var authRouter = express_1.default.Router();
authRouter.post("/admin-register", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.employerRegister), auth_controller_1.AdminRegister);
authRouter.post("/admin-login", 
// RequestValidation.validateFunction(requestValidationConfig.employerLogin),
auth_controller_1.AdminLogin);
// authRouter.post(
//   "/employee/create",
//   RequestValidation.validateFunction(requestValidationConfig.createEmployee),
//   createEmployee
// );
// authRouter.post(
//   "/employee/authentication",
//   RequestValidation.validateFunction(requestValidationConfig.employeeAuth),
//   authEmployees
// );
exports.default = authRouter;
