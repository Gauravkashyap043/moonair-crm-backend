import { Helper } from "../classes/Helper";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { EmployeesModel, EmployeesSchema } from "../models/employeeModel";
import {
  EmployeeTypeModel,
  EmployeeTypeSchema,
} from "../models/employeeTypeModel";

export const employeeCreateService = async (
  params: EmployeesModel,
  callBack: Function
) => {
  try {
    const result = await EmployeesSchema.find({
      mobileNumber: params.mobileNumber,
    });
    if (result && result.length) {
      return Helper.throwError(
        Messages.EMPLOYEE_EXIST,
        true,
        HttpStatuses.CONFLICT
      );
    }
    await EmployeesSchema.create(params);
    callBack(true);
  } catch (error) {
    callBack(error);
  }
};

export const addEmployeeTypeService = async (
  params: EmployeeTypeModel,
  callBack: Function
) => {
  try {
    const result = await EmployeeTypeSchema.find(params);
    if (result && result.length) {
      return Helper.throwError(
        Messages.EMPLOYEE_EXIST,
        true,
        HttpStatuses.CONFLICT
      );
    }
    await EmployeeTypeSchema.create(params);
    callBack(true);
  } catch (error) {
    callBack(error);
  }
};
