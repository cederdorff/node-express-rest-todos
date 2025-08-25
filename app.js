// ----------- Imports ----------- //
import express from "express";
import cors from "cors";
import todos from "./data.js";

// ----------- Server ----------- //
const server = express();

// ----------- Middleware ----------- //
server.use(express.json()); // parse JSON request bodies
server.use(cors()); // enable CORS for all requests

// ----------- Routes ----------- //

// GET /todos - get all todos
server.get("/todos", (req, res) => {
  res.json(todos); // send the todos array as JSON response
});

// GET /todos/:id - get a single todo
server.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id); // convert the id to a number
  const todo = todos.find(todo => todo.id === id); // find the todo with the id
  if (!todo) {
    // if no todo is found, send a 404 Not Found response
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(todo); // send the todo as JSON response
});

// POST /todos - create a new todo
server.post("/todos", (req, res) => {
  if (!req.body.task || req.body.completed === undefined) {
    return res.status(400).json({ error: "Task and completed fields are required" });
  }

  const newTodo = {
    id: Date.now(),
    task: req.body.task,
    completed: req.body.completed
  };

  todos.push(newTodo);
  res.status(201).json(todos);
});

// PUT /todos/:id - update a todo
server.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.task = req.body.task;
  todo.completed = req.body.completed;

  res.json(todo);
});

// DELETE /todos/:id - delete a todo
server.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos.splice(index, 1);
  res.json(todos); // send the updated todos array as JSON response
});

// ----------- Start Server ----------- //
server.listen(3000, () => {
  console.log("Server started on port 3000");
});
