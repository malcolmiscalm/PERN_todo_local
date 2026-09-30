import { Router } from "express";
import printUserAge from "./print-user-age.js";
import createDeleteAuditLog from "./create_delete_audit_log.js";
import updateAuditLog from "./update_audit_logs.js";

const AdvancedCRUDRouter = Router();

AdvancedCRUDRouter.post("/print-user-age", printUserAge);
AdvancedCRUDRouter.post("/create-delete-audit-log/:id", createDeleteAuditLog);
AdvancedCRUDRouter.put("/update-audit-log/:id", updateAuditLog);

export default AdvancedCRUDRouter;
