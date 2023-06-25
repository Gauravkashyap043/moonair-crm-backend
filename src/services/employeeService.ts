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

export const EmployeeLoginServices = async (
  params: { mobileNumber: number; password: string },
  callBack: Function
) => {
  try {
    let user: any = await EmployeesSchema.findOne(params).select("-password").populate("employeeType");
    let userMobile = await EmployeesSchema.find({ mobileNumber: params.mobileNumber });
    let userPassword = await EmployeesSchema.find({
      password: params.password,
    });

    if (
      userMobile &&
      userMobile.length &&
      userPassword &&
      userPassword.length
    ) {
      user = user.toObject();
      user.accessToken = await Helper.generateLoginToken(userMobile);
      console.log('--user--', user)
      callBack(user);
      return;
    }
    if (userMobile && !userMobile.length) {
      return Helper.throwError(
        Messages.MOBILE_NOT_EXIST,
        null,
        HttpStatuses.CONFLICT
      );
    }
    if (userPassword && !userPassword.length) {
      return Helper.throwError(
        Messages.WRONG_PASSWORD,
        null,
        HttpStatuses.CONFLICT
      );
    }
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


export const getAllEmployeeService = async (callBack: Function) => {
  try {
    const result = await EmployeesSchema.find().populate("employeeType");
    callBack(result)
  } catch (error) {
    callBack(error)
  }

}

export const getEmployeeByIdService = async (_id: string, callBack: Function) => {
  try {
    const result = await EmployeesSchema.findById({ _id }).populate("employeeType");
    callBack(result);
  } catch (error) {
    callBack(error);
  }
};
