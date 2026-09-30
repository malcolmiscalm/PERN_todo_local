import pool from "../../db.js";

export default async function createDeleteAuditLog(req, res) {
  //
  try {
    const { id } = req.params;
    await pool.query("SELECT create_delete_audit_log($1) as output_table", [
      id,
    ]);
    res.json({
      message: `Todo ${req.params.id} deleted and added audit record`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}
