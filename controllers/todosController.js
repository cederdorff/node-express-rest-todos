// ----------- Controller ----------- //
// Reads the request, calls the data layer, and sends the response.
// No array logic here — that lives in data/todos.js.
import * as todosData from "../data/todos.js";

export function getAllTodos(req, res) {
  let todos = todosData.getAllTodos();

  // ?completed=true or ?completed=false — GET /todos?completed=true
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === "true";
    todos = todos.filter((todo) => todo.completed === completed);
  }

  res.json(todos);
}

export function getTodoById(req, res) {
  const id = parseInt(req.params.id);
  const todo = todosData.getTodoById(id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(todo);
}

export function createTodo(req, res) {
  if (!req.body.task || req.body.completed === undefined) {
    return res.status(400).json({ error: "Task and completed fields are required" });
  }

  const newTodo = todosData.createTodo(req.body);
  res.status(201).json(newTodo);
}

export function updateTodo(req, res) {
  const id = parseInt(req.params.id);
  const updatedTodo = todosData.updateTodo(id, req.body);

  if (!updatedTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(updatedTodo);
}

export function deleteTodo(req, res) {
  const id = parseInt(req.params.id);
  const deleted = todosData.deleteTodo(id);

  if (!deleted) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(204).send();
}
