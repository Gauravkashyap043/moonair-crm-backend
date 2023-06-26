"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComplainFromDataByRegister = exports.updateComplainStatusController = exports.ComplainFormDelete = exports.ComplainFormUpdate = exports.GetSingleComplainData = exports.GetComplainFromData = exports.ComplainFormRegister = void 0;
var HttpResponse_1 = require("../classes/HttpResponse");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var jwtConfig_1 = require("../config/jwtConfig");
var Messages_1 = require("../constants/Messages");
var formService_1 = require("../services/formService");
var formModels_1 = require("../models/formModels");
var ComplainFormRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, getFormattedDate, formattedDate, lastComplaint, lastComplaintId, newComplaintId, params_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, jwtConfig_1.verifyToken)(req.headers.authorization)];
            case 1:
                token = _a.sent();
                if (!token) return [3 /*break*/, 3];
                getFormattedDate = function () {
                    var currentDate = new Date();
                    var year = currentDate.getFullYear().toString();
                    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    var date = currentDate.getDate().toString().padStart(2, '0');
                    return "".concat(date).concat(month).concat(year);
                };
                formattedDate = getFormattedDate();
                return [4 /*yield*/, formModels_1.complainFormSchema.findOne({ complainId: { $regex: "^".concat(formattedDate, "MA") } }, {}, { sort: { complainId: -1 } })];
            case 2:
                lastComplaint = _a.sent();
                lastComplaintId = lastComplaint
                    ? parseInt(lastComplaint.complainId.substring(10))
                    : 0;
                newComplaintId = (lastComplaintId + 1).toString().padStart(4, '0');
                params_1 = {
                    complainId: "".concat(formattedDate, "MA").concat(newComplaintId),
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
                (0, formService_1.ComplainFormRegisterService)(params_1, function (result) {
                    if (result === true) {
                        // const smsNotification = `${params.customerName} Your complaint has been registered successfully by ${token['0'].fullName}. Complaint ID: ${params.complainId}`;
                        // sendSMS(params.phoneNumber, smsNotification);
                        return new HttpResponse_1.HttpResponse(res, result ? "complain register successfully" : "Failed", params_1, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
                    }
                    new HttpResponse_1.HttpResponse(res).unauthorizedResponse();
                });
                return [2 /*return*/];
            case 3:
                new HttpResponse_1.HttpResponse(res).unauthorizedResponse();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.ComplainFormRegister = ComplainFormRegister;
var GetComplainFromData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, page_1, limit_1;
    var _a;
    return __generator(this, function (_b) {
        try {
            search = ((_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString()) || "";
            page_1 = parseInt(req.query.page) || 1;
            limit_1 = parseInt(req.query.limit) || 10;
            (0, formService_1.GetComplainDataService)(search, page_1, limit_1, function (complaints, totalCount) {
                return new HttpResponse_1.HttpResponse(res, "Get data successfully", {
                    complaints: complaints,
                    totalCount: totalCount,
                    currentPage: page_1,
                    totalPages: Math.ceil(totalCount / limit_1),
                }, IHttpStatuses_1.HttpStatuses.OK).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.GetComplainFromData = GetComplainFromData;
var GetSingleComplainData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var complainId;
    return __generator(this, function (_a) {
        try {
            complainId = req.params.id;
            (0, formService_1.GetSingleComplainDataService)(complainId, function (complaint) {
                return new HttpResponse_1.HttpResponse(res, "Get single complaint successfully", {
                    complaint: complaint,
                }, IHttpStatuses_1.HttpStatuses.OK).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.GetSingleComplainData = GetSingleComplainData;
var ComplainFormUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, complainId, updatedParams_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, jwtConfig_1.verifyToken)(req.headers.authorization)];
            case 1:
                token = _a.sent();
                if (token) {
                    complainId = req.params.complainId;
                    updatedParams_1 = {
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
                    (0, formService_1.ComplainFormUpdateService)(complainId, updatedParams_1, function (result) {
                        if (result === true) {
                            return new HttpResponse_1.HttpResponse(res, result ? "complain updated successfully" : "Failed", updatedParams_1, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
                        }
                        else {
                            new HttpResponse_1.HttpResponse(res).unauthorizedResponse();
                        }
                    });
                    return [2 /*return*/];
                }
                else {
                    new HttpResponse_1.HttpResponse(res).unauthorizedResponse();
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.ComplainFormUpdate = ComplainFormUpdate;
var ComplainFormDelete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, complainId, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, jwtConfig_1.verifyToken)(req.headers.authorization)];
            case 1:
                token = _a.sent();
                if (token) {
                    complainId = req.params.complainId;
                    (0, formService_1.ComplainFormDeleteService)(complainId, function (result) {
                        if (result === true) {
                            return new HttpResponse_1.HttpResponse(res, result
                                ? "complaint deleted successfully"
                                : "Failed to delete complaint", {}, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
                        }
                        else {
                            return new HttpResponse_1.HttpResponse(res).unauthorizedResponse();
                        }
                    });
                    return [2 /*return*/];
                }
                else {
                    return [2 /*return*/, new HttpResponse_1.HttpResponse(res).unauthorizedResponse()];
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_3)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.ComplainFormDelete = ComplainFormDelete;
var updateComplainStatusController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, params, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, jwtConfig_1.verifyToken)(req.headers.authorization)];
            case 1:
                token = _a.sent();
                params = {
                    status: req.body.status,
                    updatedBy: token[0]._id,
                    complainId: req.body.complainId,
                };
                if (token) {
                    (0, formService_1.updateComplainStatusService)(params, function (result) {
                        if (result === false) {
                            return new HttpResponse_1.HttpResponse(res).unauthorizedResponse();
                        }
                        if (result === true) {
                            return new HttpResponse_1.HttpResponse(res, Messages_1.Messages.COMPLAIN_UPDATED, result, IHttpStatuses_1.HttpStatuses.OK).sendResponse();
                        }
                        new HttpResponse_1.HttpResponse(res).sendErrorResponse(result);
                    });
                    return [2 /*return*/];
                }
                return [2 /*return*/, new HttpResponse_1.HttpResponse(res).unauthorizedResponse()];
            case 2:
                error_4 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateComplainStatusController = updateComplainStatusController;
var GetComplainFromDataByRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, page_2, limit_2, registerById;
    var _a;
    return __generator(this, function (_b) {
        try {
            search = ((_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString()) || "";
            page_2 = parseInt(req.query.page) || 1;
            limit_2 = parseInt(req.query.limit) || 10;
            registerById = req.params.id;
            (0, formService_1.GetComplainDataServiceByRegister)(search, page_2, limit_2, registerById, function (complaints, totalCount) {
                return new HttpResponse_1.HttpResponse(res, "Get data successfully", {
                    complaints: complaints,
                    totalCount: totalCount,
                    currentPage: page_2,
                    totalPages: Math.ceil(totalCount / limit_2),
                }, IHttpStatuses_1.HttpStatuses.OK).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.GetComplainFromDataByRegister = GetComplainFromDataByRegister;
