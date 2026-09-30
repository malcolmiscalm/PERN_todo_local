import pool from "../../db.js";

export default async function printUserAge(req, res) {
  // Use the stored procedure to return a message with the user's name and age
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
}
