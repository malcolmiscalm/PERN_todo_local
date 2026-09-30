import pool from "../../db.js";

// Delete a todo
export default async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json({ message: `Todo ${req.params.id} deleted successfully` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error wth omg !");
  }
}
