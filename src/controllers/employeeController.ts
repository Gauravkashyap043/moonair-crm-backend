import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { EmployeesModel } from "../models/employeeModel";
import {
  addEmployeeTypeService,
  employeeCreateService,
} from "../services/employeeService";
import {
  EmployeeTypeModel,
  EmployeeTypeSchema,
} from "../models/employeeTypeModel";
import { Helper } from "../classes/Helper";

export const employeeCreateController = (req: Request, res: Response) => {
  const params: EmployeesModel = {
    fullName: req.body.fullName,
    mobileNumber: req.body.mobileNumber,
    orgName: "moonair",
    password: req.body.password,
    employeeType: req.body.employeeType,
  };
  employeeCreateService(params, (result: any) => {
    if (result === true) {
      return new HttpResponse(
        res,
        Messages.EMPLOYEE_CREATE,
        result,
        HttpStatuses.OK
      ).sendResponse();
    }
    new HttpResponse(res).sendErrorResponse(result);
  });
};

export const addEmployeeTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const params: EmployeeTypeModel = {
      type: req.body.type,
    };
    addEmployeeTypeService(params, (result: any) => {
      if (result === true) {
        return new HttpResponse(
          res,
          Messages.EMPLOYEE_TYPE_CREATED,
          result,
          HttpStatuses.OK
        ).sendResponse();
      }
      new HttpResponse(res).sendErrorResponse(result);
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
