import { Router } from "express";
import userRoute from "./user";

const router = new Router();

router.use("/v1", userRoute);

export default router;
