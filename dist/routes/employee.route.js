"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var employeeController_1 = require("../controllers/employeeController");
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var employeeRouter = (0, express_1.Router)();
employeeRouter.post("/create", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.employeeCreate), employeeController_1.employeeCreateController);
employeeRouter.post("/login", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.employeeLogin), employeeController_1.EmployeeLogin);
employeeRouter.post("/logout", employeeController_1.userLogout);
employeeRouter.post("/add-employee-type", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.employeeType), employeeController_1.addEmployeeTypeController);
employeeRouter.get("/employee-types", employeeController_1.getAllEmployeeTypesController);
employeeRouter.get("/get-all-employee", employeeController_1.getAllEmployee);
employeeRouter.get('/get-employees-by-type/:typeId', employeeController_1.getEmployeesByType);
employeeRouter.get("/get-employee/:_id", employeeController_1.getEmployeeById);
exports.default = employeeRouter;
