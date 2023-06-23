import { Router } from "express";
import {
  addEmployeeTypeController,
  employeeCreateController,
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
  "/add-employee-type",
  RequestValidation.validateFunction(requestValidationConfig.employeeType),
  addEmployeeTypeController
);

export default employeeRouter;
