import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { Helper } from "../classes/Helper";
import { verifyToken } from "../config/jwtConfig";
import { Messages } from "../constants/Messages";
import { ComplainFormDeleteService, ComplainFormRegisterService, ComplainFormUpdateService, GetComplainDataService, GetSingleComplainDataService } from "../services/formService";
import { Complaint } from "../models/formModels";
import { sendSMS } from '../assets/notificationSender'

export const ComplainFormRegister = async (req: Request, res: Response) => {
  try {
    const token = await verifyToken(req.headers.authorization);
    if (token) {
      console.log("----------token-------------", token['0'])

      const params: Complaint = {

        complainId: req.body.complainId,
        dealerName: req.body.dealerName,
        registerBy: token['0'].fullName,
        phoneNumber: req.body.phoneNumber,
        customerName: req.body.customerName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postalCode: req.body.postalCode,
        dopDate: new Date,
        problem: req.body.problem,
        registerById: token['0'].employeeType[0],
        complainStatus: "PENDING"

      };


      console.log("========params==============",params)
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
}

export const GetComplainFromData = async (req: Request, res: Response) => {
  try {
    const search = req.query.search?.toString() || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    GetComplainDataService(search, page, limit, (complaints: any[], totalCount: number) => {
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
    });
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
        dealerName: req.body.dealerName,
        registerBy: token['0'].fullName,
        phoneNumber: req.body.phoneNumber,
        customerName: req.body.customerName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postalCode: req.body.postalCode,
        dopDate: new Date(),
        problem: req.body.problem,
        registerById: token['0'].employeeType[0],
        complainStatus: req.body.complainStatus
      };

      ComplainFormUpdateService(complainId, updatedParams, (result: boolean) => {
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
      });
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
            result ? "complaint deleted successfully" : "Failed to delete complaint",
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


