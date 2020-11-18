import { Router } from "express";
import todoController from "../controllers/todo";
import verifyToken from "../middlewares/verify-token";
import upload from "../middlewares/upload";

const { addTodo, getTodos, uploadTodo } = todoController;

const router = new Router();

router.post("/add-todo", verifyToken, addTodo);
router.post("/excel", upload.single("file"), uploadTodo);
router.get("/get-todos", verifyToken, getTodos);

export default router;
