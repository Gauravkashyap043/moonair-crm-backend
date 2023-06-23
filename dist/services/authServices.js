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
exports.authEmployeesServices = exports.createEmployeeServices = exports.employerLoginServices = exports.employerRegisterService = void 0;
var Helper_1 = require("../classes/Helper");
var employerModel_1 = require("../models/employerModel");
var Messages_1 = require("../constants/Messages");
var employeeModel_1 = require("../models/employeeModel");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var employerRegisterService = function (params, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var user, company, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, employerModel_1.EmployerSchema.find({
                        mobileNumber: params.mobileNumber,
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, employerModel_1.EmployerSchema.find({
                        orgName: params.orgName,
                    })];
            case 2:
                company = _a.sent();
                if (user && user.length) {
                    return [2 /*return*/, Helper_1.Helper.throwError(Messages_1.Messages.EMPLOYER_EXIST, null, IHttpStatuses_1.HttpStatuses.CONFLICT)];
                }
                if (company && company.length) {
                    return [2 /*return*/, Helper_1.Helper.throwError(Messages_1.Messages.COMPANY_EXIST, null, IHttpStatuses_1.HttpStatuses.CONFLICT)];
                }
                return [4 /*yield*/, employerModel_1.EmployerSchema.create(params)];
            case 3:
                _a.sent();
                callBack(true);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                callBack(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.employerRegisterService = employerRegisterService;
var employerLoginServices = function (params, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userMobile, userPassword, _a, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                return [4 /*yield*/, employerModel_1.EmployerSchema.findOne(params).select("-password")];
            case 1:
                user = _b.sent();
                return [4 /*yield*/, employerModel_1.EmployerSchema.find({
                        mobileNumber: params.mobileNumber,
                    })];
            case 2:
                userMobile = _b.sent();
                return [4 /*yield*/, employerModel_1.EmployerSchema.find({
                        password: params.password,
                    })];
            case 3:
                userPassword = _b.sent();
                if (!(userMobile &&
                    userMobile.length &&
                    userPassword &&
                    userPassword.length)) return [3 /*break*/, 5];
                user = user.toObject();
                _a = user;
                return [4 /*yield*/, Helper_1.Helper.generateLoginToken(userMobile)];
            case 4:
                _a.accessToken = _b.sent();
                callBack(user);
                return [2 /*return*/];
            case 5:
                if (userMobile && !userMobile.length) {
                    return [2 /*return*/, Helper_1.Helper.throwError(Messages_1.Messages.MOBILE_NOT_EXIST, null, IHttpStatuses_1.HttpStatuses.CONFLICT)];
                }
                if (userPassword && !userPassword.length) {
                    return [2 /*return*/, Helper_1.Helper.throwError(Messages_1.Messages.WRONG_PASSWORD, null, IHttpStatuses_1.HttpStatuses.CONFLICT)];
                }
                return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                callBack(error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.employerLoginServices = employerLoginServices;
var createEmployeeServices = function (params, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.find({ emailId: params.emailId })];
            case 1:
                user = _a.sent();
                if (user && user.length) {
                    return [2 /*return*/, Helper_1.Helper.throwError(Messages_1.Messages.EMPLOYEE_EXIST, null, IHttpStatuses_1.HttpStatuses.CONFLICT)];
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log("--error--", error_3);
                callBack(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createEmployeeServices = createEmployeeServices;
var authEmployeesServices = function (params, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var mobileNumber, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.find({
                        mobileNumber: params.mobileNumber,
                    })];
            case 1:
                mobileNumber = _a.sent();
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.find({ emailId: params.emailId })];
            case 2:
                user = _a.sent();
                if (mobileNumber && mobileNumber.length) {
                    return [2 /*return*/, Helper_1.Helper.throwError(Messages_1.Messages.MOBILE_EXIST, null, IHttpStatuses_1.HttpStatuses.CONFLICT)];
                }
                if (user && user.length) {
                    user[0].fullName = params.fullName;
                    user[0].mobileNumber = params.mobileNumber;
                    user[0].password = params.password;
                    user[0].employeeStatus = params.employeeStatus;
                    user[0].save();
                    return [2 /*return*/, callBack(true)];
                }
                Helper_1.Helper.throwError(Messages_1.Messages.EMPLOYEE_EMAIL_NOT_FOUND, null, IHttpStatuses_1.HttpStatuses.CONFLICT);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                callBack(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.authEmployeesServices = authEmployeesServices;
