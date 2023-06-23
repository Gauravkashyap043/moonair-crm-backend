"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var dbConnection_1 = require("./config/dbConnection");
var routes_1 = __importDefault(require("./routes"));
var cors = require("cors");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use(express_1.default.urlencoded());
app.use(dbConnection_1.dbConnectionMiddleware);
app.use(routes_1.default);
// app.get("/", (req, res) => {
//   res.send("What's up my");
// });
app.listen(process.env.BACK_PORT, function () {
    console.log("server running : https://".concat(process.env.BACK_HOST, ":").concat(process.env.BACK_PORT));
});
