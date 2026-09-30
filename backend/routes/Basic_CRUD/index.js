import { Router } from "express";
import createTodo from "./createTodo.js";
import getTodo from "./getTodo.js";
import updateTodo from "./updateTodo.js";
import deleteTodo from "./deleteTodo.js";

const BasicCRUDRouter = Router();

BasicCRUDRouter.post("/", createTodo);
BasicCRUDRouter.get("/", getTodo);
BasicCRUDRouter.put("/:id", updateTodo);
BasicCRUDRouter.delete("/:id", deleteTodo);

export default BasicCRUDRouter;
