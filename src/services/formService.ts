import { Helper } from "../classes/Helper";
import { Messages } from "../constants/Messages";
import { Complaint, complainFormSchema } from "../models/formModels";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { EmployeeTypeSchema } from "../models/employeeTypeModel";
import mongoose from "mongoose";
import { EmployeesSchema } from "../models/employeeModel";

export const ComplainFormRegisterService = async (
  params: Complaint,
  callBack: Function
) => {
  try {
    const employeeType = await EmployeesSchema.find({
      _id: params.registerBy,
    }).populate("employeeType");
    console.log("sadfasdfasdfds---------",employeeType[0].employeeType[0].type)
    if (
      employeeType[0].employeeType[0].type === "service" ||
      employeeType[0].employeeType[0].type === "admin"
    ) {
      await complainFormSchema.create(params);
      callBack(true);
      return;
    }
    callBack(false);
  } catch (error) {
    callBack(error);
  }
};

export const GetSingleComplainDataService = async (
  complainId: string,
  callBack: Function
) => {
  try {
    const complaint = await complainFormSchema
      .find({
        complainId,
      })
      .lean()
      .populate({
        path: "registerBy",
        populate: [
          {
            path: "employeeType",
            model: "employeeType",
          },
        ],
      })
      .populate({
        path: "updatedBy",
        populate: [
          {
            path: "employeeType",
            model: "employeeType",
          },
        ],
      });

    if (!complaint) {
      throw new Error("Complaint not found");
    }
    callBack(complaint);
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
    await complainFormSchema.findOneAndDelete({ complainId: complainId });
    callBack(true);
  } catch (error) {
    callBack(error);
  }
};

export const updateComplainStatusService = async (
  params: { status: string; updatedBy: string; complainId: string },
  callBack: Function
) => {
  try {
    const employeeType = await EmployeesSchema.find({
      _id: params.updatedBy,
    }).populate("employeeType");
    if (!employeeType && employeeType.length === 0) {
      return Helper.throwError("No data found", false, HttpStatuses.NOT_FOUND);
    }
    if (
      employeeType[0].employeeType[0].type === "technician" ||
      employeeType[0].employeeType[0].type === "admin"
    ) {
      await complainFormSchema.findOneAndUpdate(
        {
          complainId: params.complainId,
        },
        {
          $set: {
            complainStatus: params.status,
            updatedBy: params.updatedBy,
          },
        }
      );
      callBack(true);
      return;
    }
    return callBack(false);
  } catch (error) {
    callBack(error);
  }
};


export const GetComplainDataServiceByRegister = async (
  search: string,
  page: number,
  limit: number,
  registerById: string, // Add the registerBy ObjectId parameter
  callBack: Function
) => {
  try {
    let query: any = {}; // Initialize an empty query

    if (search) {
      query = { $text: { $search: search } };
    }

    // Add the registerBy ObjectId to the query
    query.registerBy = registerById;

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
