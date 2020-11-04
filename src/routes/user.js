import { Router } from "express";
import userController from "../controllers/user";

const { registerUsers, loginUsers, refreshTokenUser } = userController;

const router = new Router();

router.post("/register", registerUsers);
router.post("/login", loginUsers);
router.post("/refresh-token", refreshTokenUser);

export default router;
