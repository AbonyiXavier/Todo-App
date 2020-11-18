import { Router } from "express";
import userRoute from "./user";
import todoRoute from "./todo";

const router = new Router();

router.use("/v1", userRoute);
router.use("/v1", todoRoute);

export default router;
