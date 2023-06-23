import express from "express";
import authRouter from "./auth.route";
import formRouter from "./formRoutes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/",formRouter)

export default router;
