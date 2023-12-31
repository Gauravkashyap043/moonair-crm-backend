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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeByIdService = exports.getEmployeesByTypeService = exports.getAllEmployeeService = exports.getAllEmployeeTypesService = exports.addEmployeeTypeService = exports.UserLogoutServices = exports.EmployeeLoginServices = exports.employeeCreateService = void 0;
var Helper_1 = require("../classes/Helper");
var jwtConfig_1 = require("../config/jwtConfig");
var Messages_1 = require("../constants/Messages");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var employeeModel_1 = require("../models/employeeModel");
var employeeTypeModel_1 = require("../models/employeeTypeModel");
var employeeCreateService = function (params, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.find({
                        mobileNumber: params.mobileNumber,
                    })];
            case 1:
                result = _a.sent();
                if (result && result.length) {
                    return [2 /*return*/, Helper_1.Helper.throwError(Messages_1.Messages.EMPLOYEE_EXIST, true, IHttpStatuses_1.HttpStatuses.CONFLICT)];
                }
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.create(params)];
            case 2:
                _a.sent();
                callBack(true);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                callBack(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.employeeCreateService = employeeCreateService;
var EmployeeLoginServices = function (params, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userMobile, userPassword, _a, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.findOne(params).select("-password").populate("employeeType")];
            case 1:
                user = _b.sent();
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.find({ mobileNumber: params.mobileNumber })];
            case 2:
                userMobile = _b.sent();
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.find({
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
                console.log('--user--', user);
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
exports.EmployeeLoginServices = EmployeeLoginServices;
var UserLogoutServices = function (accessToken, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedToken, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!accessToken) {
                    return [2 /*return*/, Helper_1.Helper.throwError("Access token not provided.", null, IHttpStatuses_1.HttpStatuses.BAD_REQUEST)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, jwtConfig_1.verifyToken)(accessToken)];
            case 2:
                decodedToken = _a.sent();
                if (!decodedToken) {
                    return [2 /*return*/, Helper_1.Helper.throwError("Invalid access token.", null, IHttpStatuses_1.HttpStatuses.UNAUTHORIZED)];
                }
                // Add the token to the blacklist (revoke it)
                (0, jwtConfig_1.addToBlacklist)(accessToken);
                callBack({ success: true });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                callBack(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.UserLogoutServices = UserLogoutServices;
var addEmployeeTypeService = function (params, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, employeeTypeModel_1.EmployeeTypeSchema.find(params)];
            case 1:
                result = _a.sent();
                if (result && result.length) {
                    return [2 /*return*/, Helper_1.Helper.throwError(Messages_1.Messages.EMPLOYEE_TYPE_EXIST, true, IHttpStatuses_1.HttpStatuses.CONFLICT)];
                }
                return [4 /*yield*/, employeeTypeModel_1.EmployeeTypeSchema.create(params)];
            case 2:
                _a.sent();
                callBack(true);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                callBack(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addEmployeeTypeService = addEmployeeTypeService;
var getAllEmployeeTypesService = function () { return __awaiter(void 0, void 0, void 0, function () {
    var employeeTypes, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, employeeTypeModel_1.EmployeeTypeSchema.find({})];
            case 1:
                employeeTypes = _a.sent();
                return [2 /*return*/, employeeTypes];
            case 2:
                error_5 = _a.sent();
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllEmployeeTypesService = getAllEmployeeTypesService;
var getAllEmployeeService = function (callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.find({}, { password: 0 }).populate("employeeType")];
            case 1:
                result = _a.sent();
                callBack(result);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                callBack(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllEmployeeService = getAllEmployeeService;
var getEmployeesByTypeService = function (typeId, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var result, filteredResult, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.find({ employeeType: typeId }).populate('employeeType', '-password')];
            case 1:
                result = _a.sent();
                filteredResult = result.map(function (employee) {
                    var _a = employee.toObject(), password = _a.password, employeeWithoutPassword = __rest(_a, ["password"]);
                    return employeeWithoutPassword;
                });
                callBack(filteredResult);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                callBack(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEmployeesByTypeService = getEmployeesByTypeService;
var getEmployeeByIdService = function (_id, callBack) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, employeeModel_1.EmployeesSchema.findById({ _id: _id }).populate("employeeType")];
            case 1:
                result = _a.sent();
                callBack(result);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                callBack(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEmployeeByIdService = getEmployeeByIdService;
