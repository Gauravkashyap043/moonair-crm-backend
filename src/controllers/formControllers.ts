import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { Helper } from "../classes/Helper";
import { verifyToken } from "../config/jwtConfig";
import { Messages } from "../constants/Messages";
import {
  ComplainFormDeleteService,
  ComplainFormRegisterService,
  ComplainFormUpdateService,
  GetComplainDataService,
  GetComplainDataServiceByRegister,
  GetSingleComplainDataService,
  updateComplainStatusService,
} from "../services/formService";
import { Complaint, complainFormSchema } from "../models/formModels";
import { sendSMS } from "../assets/notificationSender";

export const ComplainFormRegister = async (req: Request, res: Response) => {
  try {
    const token = await verifyToken(req.headers.authorization);
    if (token) {
      const getFormattedDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const date = currentDate.getDate().toString().padStart(2, '0');
        return `${date}${month}${year}`;
      };
      const formattedDate = getFormattedDate();

      const lastComplaint = await complainFormSchema.findOne(
        { complainId: { $regex: `^${formattedDate}MA` } },
        {},
        { sort: { complainId: -1 } }
      );
      const lastComplaintId = lastComplaint
        ? parseInt(lastComplaint.complainId.substring(10))
        : 0;
      const newComplaintId = (lastComplaintId + 1).toString().padStart(4, '0');
      const params: Complaint = {
        complainId: `${formattedDate}MA${newComplaintId}`,
        registerBy: token[0]._id,
        phoneNumber: req.body.phoneNumber,
        customerName: req.body.customerName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postalCode: req.body.postalCode,
        dopDate: new Date(),
        problem: req.body.problem,
        complainStatus: "PENDING",
      };
      ComplainFormRegisterService(params, (result: boolean) => {
        if (result === true) {
          // const smsNotification = `${params.customerName} Your complaint has been registered successfully by ${token['0'].fullName}. Complaint ID: ${params.complainId}`;
          // sendSMS(params.phoneNumber, smsNotification);
          return new HttpResponse(
            res,
            result ? "complain register successfully" : "Failed",
            params,
            result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
          ).sendResponse();
        }
        new HttpResponse(res).unauthorizedResponse();
      });
      return;
    }
    new HttpResponse(res).unauthorizedResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const GetComplainFromData = async (req: Request, res: Response) => {
  try {
    const search = req.query.search?.toString() || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    GetComplainDataService(
      search,
      page,
      limit,
      (complaints: any[], totalCount: number) => {
        return new HttpResponse(
          res,
          "Get data successfully",
          {
            complaints,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
          },
          HttpStatuses.OK
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const GetSingleComplainData = async (req: Request, res: Response) => {
  try {
    const complainId = req.params.id;
    GetSingleComplainDataService(complainId, (complaint: any) => {
      return new HttpResponse(
        res,
        "Get single complaint successfully",
        {
          complaint,
        },
        HttpStatuses.OK
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const ComplainFormUpdate = async (req: Request, res: Response) => {
  try {
    const token = await verifyToken(req.headers.authorization);
    if (token) {
      const complainId = req.params.complainId;
      const updatedParams: Complaint = {
        complainId: req.body.complainId,
        registerBy: token["0"].fullName,
        phoneNumber: req.body.phoneNumber,
        customerName: req.body.customerName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postalCode: req.body.postalCode,
        dopDate: new Date(),
        problem: req.body.problem,
        complainStatus: req.body.complainStatus,
      };

      ComplainFormUpdateService(
        complainId,
        updatedParams,
        (result: boolean) => {
          if (result === true) {
            return new HttpResponse(
              res,
              result ? "complain updated successfully" : "Failed",
              updatedParams,
              result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
            ).sendResponse();
          } else {
            new HttpResponse(res).unauthorizedResponse();
          }
        }
      );
      return;
    } else {
      new HttpResponse(res).unauthorizedResponse();
    }
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const ComplainFormDelete = async (req: Request, res: Response) => {
  try {
    const token = await verifyToken(req.headers.authorization);
    if (token) {
      const complainId = req.params.complainId;

      ComplainFormDeleteService(complainId, (result: boolean) => {
        if (result === true) {
          return new HttpResponse(
            res,
            result
              ? "complaint deleted successfully"
              : "Failed to delete complaint",
            {},
            result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
          ).sendResponse();
        } else {
          return new HttpResponse(res).unauthorizedResponse();
        }
      });
      return;
    } else {
      return new HttpResponse(res).unauthorizedResponse();
    }
  } catch (error) {
    return new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateComplainStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const token = await verifyToken(req.headers.authorization);
    const params = {
      status: req.body.status,
      updatedBy: token[0]._id,
      complainId: req.body.complainId,
    };
    if (token) {
      updateComplainStatusService(params, (result: any) => {
        if (result === false) {
          return new HttpResponse(res).unauthorizedResponse();
        }
        if (result === true) {
          return new HttpResponse(
            res,
            Messages.COMPLAIN_UPDATED,
            result,
            HttpStatuses.OK
          ).sendResponse();
        }
        new HttpResponse(res).sendErrorResponse(result);
      });
      return;
    }
    return new HttpResponse(res).unauthorizedResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const GetComplainFromDataByRegister = async (req: Request, res: Response) => {
  try {
    const search = req.query.search?.toString() || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const registerById = req.params.id; // Get the registerBy ObjectId from the route parameter

    GetComplainDataServiceByRegister(
      search,
      page,
      limit,
      registerById,
      (complaints: any[], totalCount: number) => {
        return new HttpResponse(
          res,
          "Get data successfully",
          {
            complaints,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
          },
          HttpStatuses.OK
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
