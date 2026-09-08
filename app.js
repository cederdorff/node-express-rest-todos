// ----------- Imports ----------- //
import express from "express";
import cors from "cors";
import todosRoutes from "./routes/todosRoutes.js";

// ----------- Server ----------- //
const server = express();

// ----------- Middleware ----------- //
server.use(express.json()); // parse JSON request bodies
server.use(cors()); // enable CORS for all requests

// ----------- Routes ----------- //
server.use("/todos", todosRoutes);

// ----------- Start Server ----------- //
server.listen(3000, () => {
  console.log("Server started on port 3000");
});
