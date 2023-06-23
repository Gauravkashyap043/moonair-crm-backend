import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { ComplainFormRegister, GetComplainFromData } from "../controllers/formControllers";

const formRouter = express.Router();

formRouter.post("/complain-form",ComplainFormRegister)
formRouter.get("/complain-data",GetComplainFromData)

export default formRouter;