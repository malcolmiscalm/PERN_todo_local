import pool from "../../db.js";

// Update a todo
export default async function updateTodo(req, res) {
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
}
