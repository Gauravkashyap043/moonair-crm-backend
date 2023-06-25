import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { ComplainFormDelete, ComplainFormRegister, ComplainFormUpdate, GetComplainFromData } from "../controllers/formControllers";

const formRouter = express.Router();

formRouter.post("/complain-form", ComplainFormRegister)
formRouter.get("/complain-data", GetComplainFromData)
formRouter.put("/complain-form/:complainId", ComplainFormUpdate);
formRouter.delete("/complain-form/:complainId", ComplainFormDelete);

export default formRouter;