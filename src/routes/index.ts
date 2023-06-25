import express from "express";
import authRouter from "./auth.route";
import formRouter from "./formRoutes";
import employeeRouter from "./employee.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/form", formRouter);
router.use("/employee", employeeRouter);

export default router;
