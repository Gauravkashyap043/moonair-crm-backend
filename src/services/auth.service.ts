import { Helper } from "../classes/Helper";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { AdiminSchema, AdminModel } from "../models/authModal";

export const AdminRegisterService = async (
    params: AdminModel,
    callBack: Function
  ) => {
    try {
      let user = await AdiminSchema.find({
        mobileNumber: params.mobileNumber,
      });
      let company = await AdiminSchema.find({
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
      await AdiminSchema.create(params);
      callBack(true);
    } catch (error) {
      callBack(error);
    }
  };

  export const AdminLoginServices = async (
    params: { mobileNumber: number; password: string },
    callBack: Function
  ) => {
    try {
      let user: any = await AdiminSchema.findOne(params).select("-password");
      let userMobile = await AdiminSchema.find({
        mobileNumber: params.mobileNumber,
      });
      let userPassword = await AdiminSchema.find({
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