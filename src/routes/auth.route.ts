import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { AdminLogin, AdminRegister } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post(
  "/admin-register",
  RequestValidation.validateFunction(requestValidationConfig.employerRegister),
  AdminRegister
);

authRouter.post(
  "/admin-login",
  RequestValidation.validateFunction(requestValidationConfig.employerLogin),
  AdminLogin
);

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

export default authRouter;
