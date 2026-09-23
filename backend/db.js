import { Pool } from "pg";

// This is the connection pool for the PostgreSQL database. It allows us to connect to the database and execute queries.
const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5434,
  database: "PERN_todo_db",
});

export default pool;
