import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const { description, completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed || false],
    );
    res.json(newTodo.rows[0]); // The first and only element of the rows array is the newly created todo
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error wth omg !");
  }
});

// Read all todos
router.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error wth omg !");
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
      [description, completed, id],
    );
    res.json(updatedTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error wth omg !");
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json({ message: `Todo ${req.params.id} deleted successfully` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error wth omg !");
  }
});

// Use the stored procedure to return a message with the user's name and age
router.post("/print-user-age", async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || age === undefined) {
      return res.status(400).send("Missing name or age");
    }
    const result = await pool.query(
      "SELECT print_user_age($1, $2) AS output_table",
      [name, age],
    );
    const message = result.rows[0].output_table || "Procedure executed";
    res.json({ message: message });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Use a stored function to create an audit log entry for a todo action
// router.post("/audit-log", async (req, res) => {
//   try {

export default router;
