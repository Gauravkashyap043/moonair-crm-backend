import { Request, Response } from "express";
import {
  authEmployeesServices,
  createEmployeeServices,
  employerLoginServices,
  employerRegisterService,
} from "../services/authServices";
import { HttpResponse } from "../classes/HttpResponse";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { Helper } from "../classes/Helper";
import { verifyToken } from "../config/jwtConfig";
import { Messages } from "../constants/Messages";

export const employerRegister = async (req: Request, res: Response) => {
  const params = {
    fullName: req.body.fullName,
    orgName: req.body.orgName,
    mobileNumber: req.body.mobileNumber,
    password: Helper.hashPassword(req.body.password),
    userType: "ROOT",
  };
  try {
    employerRegisterService(params, (result: boolean) => {
      if (result === true) {
        return new HttpResponse(
          res,
          result ? "You are registered successfully" : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
      new HttpResponse(res).sendErrorResponse(result);
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

// export const employerLogin = async (req: Request, res: Response) => {
//   const params = {
//     mobileNumber: req.body.mobileNumber,
//     password: Helper.hashPassword(req.body.password),
//   };
//   try {
//     employerLoginServices(params, (result: any) => {
//       if (result && result.accessToken) {
//         return new HttpResponse(
//           res,
//           "Logged in successfully.",
//           result,
//           HttpStatuses.OK
//         ).sendResponse();
//       }
//       new HttpResponse(res).sendErrorResponse(result);
//     });
//   } catch (error) {
//     new HttpResponse(res).sendErrorResponse(error);
//   }
// };

// export const createEmployee = async (req: Request, res: Response) => {
//   try {
//     const token = await verifyToken(req.headers.authorization);
//     if (token) {
//       const params = {
//         emailId: req.body.emailId,
//         orgName: token[0].orgName,
//         companyId: token[0]._id,
//         employeeStatus: "pending",
//         userType: "EMPLOYEES",
//       };
//       createEmployeeServices(params, (result: any) => {
//         if (result === true) {
//           return new HttpResponse(
//             res,
//             "Employee created successfully.",
//             result,
//             HttpStatuses.OK
//           ).sendResponse();
//         }
//         new HttpResponse(res).sendErrorResponse(result);
//       });
//       return;
//     }
//     new HttpResponse(res).unauthorizedResponse();
//   } catch (error) {
//     new HttpResponse(res).sendErrorResponse(error);
//   }
// };

// export const authEmployees = async (req: Request, res: Response) => {
//   // hash the password todo
//   try {
//     const params = {
//       emailId: req.body.emailId,
//       fullName: req.body.fullName,
//       mobileNumber: req.body.mobileNumber,
//       password: req.body.password,
//       employeeStatus: "active",
//     };
//     authEmployeesServices(params, (result: any) => {
//       if (result === true) {
//         return new HttpResponse(
//           res,
//           Messages.EMPLOYEE_AUTHENTICATED,
//           result,
//           HttpStatuses.OK
//         ).sendResponse();
//       }
//       new HttpResponse(res).sendErrorResponse(result);
//     });
//   } catch (error) {
//     new HttpResponse(res).sendErrorResponse(error);
//   }
// };
