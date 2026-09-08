// ----------- Routes ----------- //
// Maps HTTP method + path to a controller function. No logic here.
import { Router } from "express";
import * as todosController from "../controllers/todosController.js";

const router = Router();

router.get("/", todosController.getAllTodos);
router.get("/:id", todosController.getTodoById);
router.post("/", todosController.createTodo);
router.put("/:id", todosController.updateTodo);
router.delete("/:id", todosController.deleteTodo);

export default router;
