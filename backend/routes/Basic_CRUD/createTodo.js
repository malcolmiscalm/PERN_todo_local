import pool from "../../db.js";

// Create a new todo
export default async function createTodo(req, res) {
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
}
