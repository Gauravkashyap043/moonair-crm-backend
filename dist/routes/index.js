"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var formRoutes_1 = __importDefault(require("./formRoutes"));
var employee_route_1 = __importDefault(require("./employee.route"));
var router = express_1.default.Router();
router.use("/employee", employee_route_1.default);
router.use("/form", formRoutes_1.default);
exports.default = router;
