import pool from "../../db.js";

// Read all todos
export default async function getTodo(req, res) {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error wth omg !");
  }
}
