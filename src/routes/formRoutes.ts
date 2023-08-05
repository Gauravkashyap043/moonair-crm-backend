import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import {
  ComplainFormDelete,
  ComplainFormRegister,
  ComplainFormUpdate,
  GetComplainFromData,
  GetComplainFromDataByAssignedTo,
  GetComplainFromDataByRegister,
  GetSingleComplainData,
  updateComplainStatusController,
} from "../controllers/formControllers";

const formRouter = express.Router();

formRouter.post("/complain-form", ComplainFormRegister);
formRouter.get("/complain-data", GetComplainFromData);
formRouter.get("/complain-data/:complainId", GetSingleComplainData);
formRouter.get("/complain-data-register/:id", GetComplainFromDataByRegister);
formRouter.get("/complain-data-assignedTo/:id", GetComplainFromDataByAssignedTo);
formRouter.put("/complain-form/:complainId", ComplainFormUpdate);
formRouter.delete("/complain-form/:complainId", ComplainFormDelete);
formRouter.put("/update-status", updateComplainStatusController);

export default formRouter;
