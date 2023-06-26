"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var formControllers_1 = require("../controllers/formControllers");
var formRouter = express_1.default.Router();
formRouter.post("/complain-form", formControllers_1.ComplainFormRegister);
formRouter.get("/complain-data", formControllers_1.GetComplainFromData);
formRouter.get("/complain-data/:id", formControllers_1.GetSingleComplainData);
formRouter.get("/complain-data-register/:id", formControllers_1.GetComplainFromDataByRegister);
formRouter.put("/complain-form/:complainId", formControllers_1.ComplainFormUpdate);
formRouter.delete("/complain-form/:complainId", formControllers_1.ComplainFormDelete);
formRouter.put("/update-status", formControllers_1.updateComplainStatusController);
exports.default = formRouter;
