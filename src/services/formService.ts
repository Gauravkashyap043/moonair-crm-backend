import { Helper } from "../classes/Helper";
import { Messages } from "../constants/Messages";
import { Complaint, complainFormSchema } from "../models/formModels";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { EmployeeTypeSchema } from "../models/employeeTypeModel";

export const ComplainFormRegisterService = async (
  params: Complaint,
  callBack: Function
) => {
  try {
    const employeeTpye = await EmployeeTypeSchema.findById({ _id: params.registerById })
    if (employeeTpye.type === "service") {
      await complainFormSchema.create(params);
      callBack(true);
    }
    callBack(false)
  } catch (error) {
    callBack(error);
  }
};


export const GetComplainDataService = async (
  search: string,
  page: number,
  limit: number,
  callBack: Function
) => {
  try {
    let query: any = {}; // Initialize an empty query

    if (search) {
      query = { $text: { $search: search } };
    }

    const totalCount = await complainFormSchema.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    const complaints = await complainFormSchema
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    callBack(complaints, totalCount, page, totalPages);
  } catch (error) {
    callBack(error);
  }
};

export const ComplainFormUpdateService = async (
  complainId: string,
  updatedParams: Complaint,
  callBack: Function
) => {
  try {
    await complainFormSchema.findOneAndUpdate({ complainId }, updatedParams);
    callBack(true);
  } catch (error) {
    callBack(error);
  }
};

export const ComplainFormDeleteService = async (
  complainId: string,
  callBack: Function
) => {
  try {
    await complainFormSchema.findOneAndDelete({ complainId:complainId });
    callBack(true);
  } catch (error) {
    callBack(error);
  }
};

