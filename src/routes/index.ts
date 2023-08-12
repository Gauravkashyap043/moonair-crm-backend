import express from "express";
import formRouter from "./formRoutes";
import employeeRouter from "./employee.route";

const router = express.Router();

router.use("/employee", employeeRouter);
router.use("/form", formRouter);

export default router;
