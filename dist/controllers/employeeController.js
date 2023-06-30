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
exports.getEmployeeById = exports.getEmployeesByType = exports.getAllEmployee = exports.getAllEmployeeTypesController = exports.addEmployeeTypeController = exports.EmployeeLogin = exports.employeeCreateController = void 0;
var HttpResponse_1 = require("../classes/HttpResponse");
var Messages_1 = require("../constants/Messages");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var employeeService_1 = require("../services/employeeService");
var Helper_1 = require("../classes/Helper");
var employeeCreateController = function (req, res) {
    var params = {
        fullName: req.body.fullName,
        mobileNumber: req.body.mobileNumber,
        orgName: "moonair",
        password: Helper_1.Helper.hashPassword(req.body.password),
        employeeType: req.body.employeeType,
    };
    (0, employeeService_1.employeeCreateService)(params, function (result) {
        if (result === true) {
            return new HttpResponse_1.HttpResponse(res, Messages_1.Messages.EMPLOYEE_CREATE, result, IHttpStatuses_1.HttpStatuses.OK).sendResponse();
        }
        new HttpResponse_1.HttpResponse(res).sendErrorResponse(result);
    });
};
exports.employeeCreateController = employeeCreateController;
var EmployeeLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        params = {
            mobileNumber: req.body.mobileNumber,
            password: Helper_1.Helper.hashPassword(req.body.password),
        };
        try {
            (0, employeeService_1.EmployeeLoginServices)(params, function (result) {
                if (result && result.accessToken) {
                    return new HttpResponse_1.HttpResponse(res, "Logged in successfully.", result, IHttpStatuses_1.HttpStatuses.OK).sendResponse();
                }
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(result);
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.EmployeeLogin = EmployeeLogin;
var addEmployeeTypeController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        try {
            params = {
                type: req.body.type,
            };
            (0, employeeService_1.addEmployeeTypeService)(params, function (result) {
                if (result === true) {
                    return new HttpResponse_1.HttpResponse(res, Messages_1.Messages.EMPLOYEE_TYPE_CREATED, result, IHttpStatuses_1.HttpStatuses.OK).sendResponse();
                }
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(result);
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.addEmployeeTypeController = addEmployeeTypeController;
var getAllEmployeeTypesController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employeeTypes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, employeeService_1.getAllEmployeeTypesService)()];
            case 1:
                employeeTypes = _a.sent();
                return [2 /*return*/, new HttpResponse_1.HttpResponse(res, Messages_1.Messages.EMPLOYEE_TYPES_FETCHED, employeeTypes, IHttpStatuses_1.HttpStatuses.OK).sendResponse()];
            case 2:
                error_1 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllEmployeeTypesController = getAllEmployeeTypesController;
var getAllEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            (0, employeeService_1.getAllEmployeeService)(function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Get all Employee Data sucessfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getAllEmployee = getAllEmployee;
var getEmployeesByType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var typeId;
    return __generator(this, function (_a) {
        try {
            typeId = req.params.typeId;
            (0, employeeService_1.getEmployeesByTypeService)(typeId, function (result) {
                if (result) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ message: 'No employees found for the given type ID' });
                }
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        return [2 /*return*/];
    });
}); };
exports.getEmployeesByType = getEmployeesByType;
var getEmployeeById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        try {
            id = req.params._id;
            console.log(req.params);
            // console.log(_id)
            (0, employeeService_1.getEmployeeByIdService)(id, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Get Employee Data successfully." : "Employee not found.", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.NOT_FOUND).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getEmployeeById = getEmployeeById;
