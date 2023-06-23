import { Helper } from "../classes/Helper";
import { EmployerSchema, employerModel } from "../models/employerModel";
import { Messages } from "../constants/Messages";
import { EmployeesSchema } from "../models/employeeModel";
import { HttpStatuses } from "../interfaces/IHttpStatuses";

export const employerRegisterService = async (
  params: employerModel,
  callBack: Function
) => {
  try {
    let user = await EmployerSchema.find({
      mobileNumber: params.mobileNumber,
    });
    let company = await EmployerSchema.find({
      orgName: params.orgName,
    });
    if (user && user.length) {
      return Helper.throwError(
        Messages.EMPLOYER_EXIST,
        null,
        HttpStatuses.CONFLICT
      );
    }
    if (company && company.length) {
      return Helper.throwError(
        Messages.COMPANY_EXIST,
        null,
        HttpStatuses.CONFLICT
      );
    }
    await EmployerSchema.create(params);
    callBack(true);
  } catch (error) {
    callBack(error);
  }
};

export const employerLoginServices = async (
  params: { mobileNumber: number; password: string },
  callBack: Function
) => {
  try {
    let user: any = await EmployerSchema.findOne(params).select("-password");
    let userMobile = await EmployerSchema.find({
      mobileNumber: params.mobileNumber,
    });
    let userPassword = await EmployerSchema.find({
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

export const createEmployeeServices = async (
  params: {
    emailId: string;
    orgName: string;
    userType: string;
  },
  callBack: Function
) => {
  try {
    let user = await EmployeesSchema.find({ emailId: params.emailId });
    if (user && user.length) {
      return Helper.throwError(
        Messages.EMPLOYEE_EXIST,
        null,
        HttpStatuses.CONFLICT
      );
    }

    // Helper.sendEmail(params.emailId, async (result: any) => {
    //   try {
    //     if (result) {
    //       await EmployeesSchema.create(params);
    //       callBack(true);
    //       return;
    //     }
    //     Helper.throwError(Messages.ERROR_WHILE_CREATE_EMPLOYEE, null);
    //   } catch (error) {
    //     callBack(error);
    //   }
    // });
  } catch (error) {
    console.log("--error--", error);
    callBack(error);
  }
};

export const authEmployeesServices = async (
  params: {
    emailId: string;
    fullName: string;
    mobileNumber: number;
    password: string;
    employeeStatus: string;
  },
  callBack: Function
) => {
  try {
    let mobileNumber = await EmployeesSchema.find({
      mobileNumber: params.mobileNumber,
    });
    let user = await EmployeesSchema.find({ emailId: params.emailId });
    if (mobileNumber && mobileNumber.length) {
      return Helper.throwError(
        Messages.MOBILE_EXIST,
        null,
        HttpStatuses.CONFLICT
      );
    }
    if (user && user.length) {
      user[0].fullName = params.fullName;
      user[0].mobileNumber = params.mobileNumber;
      user[0].password = params.password;
      user[0].employeeStatus = params.employeeStatus;
      user[0].save();
      return callBack(true);
    }
    Helper.throwError(
      Messages.EMPLOYEE_EMAIL_NOT_FOUND,
      null,
      HttpStatuses.CONFLICT
    );
  } catch (error) {
    callBack(error);
  }
};
