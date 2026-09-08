// ----------- Routes ----------- //
import { Router } from "express";
import * as todosData from "../data/todos.js";

const router = Router();

// GET /todos - get all todos, optionally filtered by ?completed=true|false
router.get("/", (req, res) => {
  let todos = todosData.getAllTodos();

  if (req.query.completed !== undefined) {
    const completed = req.query.completed === "true";
    todos = todos.filter((todo) => todo.completed === completed);
  }

  res.json(todos);
});

// GET /todos/:id - get a single todo
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todosData.getTodoById(id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(todo);
});

// POST /todos - create a new todo
router.post("/", (req, res) => {
  if (!req.body.task || req.body.completed === undefined) {
    return res.status(400).json({ error: "Task and completed fields are required" });
  }

  const newTodo = todosData.createTodo(req.body);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - update a todo
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = todosData.updateTodo(id, req.body);

  if (!updatedTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(updatedTodo);
});

// DELETE /todos/:id - delete a todo
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = todosData.deleteTodo(id);

  if (!deleted) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(204).send();
});

export default router;
