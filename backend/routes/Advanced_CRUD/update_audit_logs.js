import pool from "../../db.js";

export default async function updateAuditLog(req, res) {
  // console.log("BODY:", req.body);
  try {
    const { id } = req.params;
    const { editOperation: edit_operation, description, completed } = req.body;
    await pool.query(
      "SELECT update_audit_log($1, $2, $3, $4) as output_table",
      [id, edit_operation, description, completed || false],
    );
    res.json({
      message: `Todo ${req.params.id} `,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}
