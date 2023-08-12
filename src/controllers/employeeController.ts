import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { EmployeesModel } from "../models/employeeModel";
import {
  EmployeeLoginServices,
  UserLogoutServices,
  addEmployeeTypeService,
  employeeCreateService,
  getAllEmployeeService,
  getAllEmployeeTypesService,
  getEmployeeByIdService,
  getEmployeesByTypeService,
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
    password: Helper.hashPassword(req.body.password),
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

export const EmployeeLogin = async (req: Request, res: Response) => {
  const params = {
    mobileNumber: req.body.mobileNumber,
    password: Helper.hashPassword(req.body.password),
  };
  try {
    EmployeeLoginServices(params, (result: any) => {
      if (result && result.accessToken) {
        return new HttpResponse(
          res,
          "Logged in successfully.",
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

export const userLogout = async (req: Request, res: Response) => {
  const accessToken = req.header("Authorization")?.replace("Bearer ", "");

  try {
    await UserLogoutServices(accessToken, (result: any) => {
      new HttpResponse(res, "Logged out successfully.", result, HttpStatuses.OK).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
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

export const getAllEmployeeTypesController = async (
  req: Request,
  res: Response
) => {
  try {
    const employeeTypes = await getAllEmployeeTypesService();
    return new HttpResponse(
      res,
      Messages.EMPLOYEE_TYPES_FETCHED,
      employeeTypes,
      HttpStatuses.OK
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};


export const getAllEmployee = async (req: Request, res: Response) => {
  try {
    getAllEmployeeService((result: any) => {
      new HttpResponse(
        res,
        result ? "Get all Employee Data sucessfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
}

export const getEmployeesByType = async (req: Request, res: Response) => {
  try {
    const typeId = req.params.typeId;
    getEmployeesByTypeService(typeId, (result: any) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'No employees found for the given type ID' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const id = req.params._id
    console.log(req.params)
    // console.log(_id)
    getEmployeeByIdService(id, (result: any) => {
      new HttpResponse(
        res,
        result ? "Get Employee Data successfully." : "Employee not found.",
        result,
        result ? HttpStatuses.OK : HttpStatuses.NOT_FOUND
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};