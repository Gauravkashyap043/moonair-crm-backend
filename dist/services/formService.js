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
exports.GetComplainDataServiceByAssignedTo = exports.GetComplainDataServiceByRegister = exports.updateComplainStatusService = exports.ComplainFormDeleteService = exports.ComplainFormUpdateService = exports.GetComplainDataService = exports.GetSingleComplainDataService = exports.ComplainFormRegisterService = void 0;
var Helper_1 = require("../classes/Helper");
var formModels_1 = require("../models/formModels");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var employeeModel_1 = require("../models/employeeModel");
var ComplainFormRegisterService = function (params, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var employeeType, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.find({
                        _id: params.registerBy,
                    }).populate("employeeType")];
            case 1:
                employeeType = _a.sent();
                console.log("sadfasdfasdfds---------", employeeType[0].employeeType[0].type);
                if (!(employeeType[0].employeeType[0].type === "service" ||
                    employeeType[0].employeeType[0].type === "admin")) return [3 /*break*/, 3];
                return [4 /*yield*/, formModels_1.complainFormSchema.create(params)];
            case 2:
                _a.sent();
                callBack(true);
                return [2 /*return*/];
            case 3:
                callBack(false);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                callBack(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.ComplainFormRegisterService = ComplainFormRegisterService;
var GetSingleComplainDataService = function (complainId, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var complaint, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, formModels_1.complainFormSchema
                        .find({
                        complainId: complainId,
                    })
                        .lean()
                        .populate({
                        path: "registerBy",
                        populate: [
                            {
                                path: "employeeType",
                                model: "employeeType",
                                select: "-password",
                            },
                        ],
                        select: "-password",
                    })
                        .populate({
                        path: "updatedBy",
                        populate: [
                            {
                                path: "employeeType",
                                model: "employeeType",
                                select: "-password",
                            },
                        ],
                        select: "-password",
                    })
                        .populate({
                        path: "assignedTo",
                        populate: [
                            {
                                path: "employeeType",
                                model: "employeeType",
                                select: "-password",
                            },
                        ],
                        select: "-password",
                    })];
            case 1:
                complaint = _a.sent();
                if (!complaint) {
                    throw new Error("Complaint not found");
                }
                callBack(complaint);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                callBack(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetSingleComplainDataService = GetSingleComplainDataService;
var GetComplainDataService = function (search, page, limit, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var query, totalCount, totalPages, complaints, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = {};
                if (search) {
                    query = { $text: { $search: search } };
                }
                return [4 /*yield*/, formModels_1.complainFormSchema.countDocuments(query)];
            case 1:
                totalCount = _a.sent();
                totalPages = Math.ceil(totalCount / limit);
                return [4 /*yield*/, formModels_1.complainFormSchema
                        .find(query)
                        .lean()
                        .populate({
                        path: "registerBy",
                        populate: [
                            {
                                path: "employeeType",
                                model: "employeeType",
                            },
                        ],
                        select: "-password",
                    })
                        .populate({
                        path: "updatedBy",
                        populate: [
                            {
                                path: "employeeType",
                                model: "employeeType",
                                select: "-password",
                            },
                        ],
                        select: "-password",
                    })
                        .populate({
                        path: "assignedTo",
                        populate: [
                            {
                                path: "employeeType",
                                model: "employeeType",
                                select: "-password",
                            },
                        ],
                        select: "-password",
                    })
                        .skip((page - 1) * limit)
                        .limit(limit)];
            case 2:
                complaints = _a.sent();
                callBack(complaints, totalCount, page, totalPages);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                callBack(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetComplainDataService = GetComplainDataService;
var ComplainFormUpdateService = function (complainId, updatedParams, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, formModels_1.complainFormSchema.findOneAndUpdate({ complainId: complainId }, updatedParams)];
            case 1:
                _a.sent();
                callBack(true);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                callBack(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.ComplainFormUpdateService = ComplainFormUpdateService;
var ComplainFormDeleteService = function (complainId, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, formModels_1.complainFormSchema.findOneAndDelete({ complainId: complainId })];
            case 1:
                _a.sent();
                callBack(true);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                callBack(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.ComplainFormDeleteService = ComplainFormDeleteService;
var updateComplainStatusService = function (params, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var employeeType, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.find({
                        _id: params.updatedBy,
                    }).populate("employeeType")];
            case 1:
                employeeType = _a.sent();
                if (!employeeType && employeeType.length === 0) {
                    return [2 /*return*/, Helper_1.Helper.throwError("No data found", false, IHttpStatuses_1.HttpStatuses.NOT_FOUND)];
                }
                if (!(employeeType[0].employeeType[0].type === "technician" ||
                    employeeType[0].employeeType[0].type === "admin")) return [3 /*break*/, 3];
                return [4 /*yield*/, formModels_1.complainFormSchema.findOneAndUpdate({
                        complainId: params.complainId,
                    }, {
                        $set: {
                            complainStatus: params.complainStatus,
                            updatedBy: params.updatedBy,
                            assignedTo: params.assignedTo
                        },
                    })];
            case 2:
                _a.sent();
                callBack(true);
                return [2 /*return*/];
            case 3: return [2 /*return*/, callBack(false)];
            case 4:
                error_6 = _a.sent();
                callBack(error_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateComplainStatusService = updateComplainStatusService;
var GetComplainDataServiceByRegister = function (search, page, limit, registerById, // Add the registerBy ObjectId parameter
callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var query, totalCount, totalPages, complaints, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = {};
                if (search) {
                    query = { $text: { $search: search } };
                }
                // Add the registerBy ObjectId to the query
                query.registerBy = registerById;
                return [4 /*yield*/, formModels_1.complainFormSchema.countDocuments(query)];
            case 1:
                totalCount = _a.sent();
                totalPages = Math.ceil(totalCount / limit);
                return [4 /*yield*/, formModels_1.complainFormSchema
                        .find(query)
                        .populate({
                        path: "registerBy",
                        populate: [
                            {
                                path: "employeeType",
                                model: "employeeType",
                            },
                        ],
                        select: "-password",
                    })
                        .populate({
                        path: "updatedBy",
                        populate: [
                            {
                                path: "employeeType",
                                model: "employeeType",
                                select: "-password",
                            },
                        ],
                        select: "-password",
                    })
                        .populate({
                        path: "assignedTo",
                        populate: [
                            {
                                path: "employeeType",
                                model: "employeeType",
                                select: "-password",
                            },
                        ],
                        select: "-password",
                    })
                        .skip((page - 1) * limit)
                        .limit(limit)];
            case 2:
                complaints = _a.sent();
                callBack(complaints, totalCount, page, totalPages);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                callBack(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetComplainDataServiceByRegister = GetComplainDataServiceByRegister;
var GetComplainDataServiceByAssignedTo = function (search, page, limit, assignedToId, // Add the assignedTo ObjectId parameter
callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var query, totalCount, totalPages, complaints, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = {};
                if (search) {
                    query = { $text: { $search: search } };
                }
                // Add the assignedTo ObjectId to the query
                query.assignedTo = assignedToId;
                return [4 /*yield*/, formModels_1.complainFormSchema.countDocuments(query)];
            case 1:
                totalCount = _a.sent();
                totalPages = Math.ceil(totalCount / limit);
                return [4 /*yield*/, formModels_1.complainFormSchema
                        .find(query)
                        .populate({
                        path: "assignedTo",
                        populate: [
                            {
                                path: "employeeType",
                                model: "employeeType",
                                select: "-password",
                            },
                        ],
                        select: "-password",
                    })
                        .skip((page - 1) * limit)
                        .limit(limit)];
            case 2:
                complaints = _a.sent();
                callBack(complaints, totalCount, page, totalPages);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                callBack(error_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetComplainDataServiceByAssignedTo = GetComplainDataServiceByAssignedTo;
