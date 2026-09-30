// This file is the entry point for the backend server. It sets up the Express application, connects to the database, and starts the server.
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todos.js";
import rootRouter from "./routes/index.js";
import { main_door } from "../shared.js";

// Create an instance of the Express application
const app = express();

// use cors to allow cross-origin requests
app.use(cors());

// // Middleware to parse JSON bodies, now we can access the request body as req.body
app.use(express.json());

// Middleware to parse form data, now we can access the request body as req.body
app.use(express.urlencoded({ extended: true }));

// Use the todos substring router for all routes starting with "/todos"
// app.use(main_door, todoRoutes);

// Mount all the routes from the index.js file in the routes folder
app.use(main_door, rootRouter);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
