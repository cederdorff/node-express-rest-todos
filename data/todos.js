// ----------- In-memory data store ----------- //
// This is the only file that touches the `todos` array directly.
// Routes and controllers go through the functions below instead.

let todos = [
  { id: 1, task: "Buy groceries", completed: false },
  { id: 2, task: "Finish homework", completed: false },
  { id: 3, task: "Call mom", completed: false },
  { id: 4, task: "Go for a run", completed: false },
  { id: 5, task: "Read a book", completed: false },
  { id: 6, task: "Write a blog post", completed: false }
];

export function getAllTodos() {
  return todos;
}

export function getTodoById(id) {
  return todos.find((todo) => todo.id === id);
}

export function createTodo({ task, completed }) {
  const newTodo = { id: Date.now(), task, completed };
  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(id, { task, completed }) {
  const todo = getTodoById(id);
  if (!todo) return undefined;

  todo.task = task;
  todo.completed = completed;
  return todo;
}

export function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return false;

  todos.splice(index, 1);
  return true;
}
