import { Router } from "express";
import {
  EmployeeLogin,
  addEmployeeTypeController,
  employeeCreateController,
  getAllEmployee,
  getAllEmployeeTypesController,
  getEmployeeById,
  getEmployeesByType,
  userLogout,
} from "../controllers/employeeController";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";

const employeeRouter = Router();

employeeRouter.post(
  "/create",
  RequestValidation.validateFunction(requestValidationConfig.employeeCreate),
  employeeCreateController
);

employeeRouter.post(
  "/login",
  RequestValidation.validateFunction(requestValidationConfig.employeeLogin),
  EmployeeLogin
);

employeeRouter.post("/logout", userLogout);

employeeRouter.post(
  "/add-employee-type",
  RequestValidation.validateFunction(requestValidationConfig.employeeType),
  addEmployeeTypeController
);

employeeRouter.get("/employee-types", getAllEmployeeTypesController);

employeeRouter.get("/get-all-employee", getAllEmployee);

employeeRouter.get('/get-employees-by-type/:typeId', getEmployeesByType);

employeeRouter.get("/get-employee/:_id", getEmployeeById);


export default employeeRouter;
