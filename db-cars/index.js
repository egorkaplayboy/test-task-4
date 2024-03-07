require("dotenv").config();
const { Pool } = require("pg");
const { createTables } = require("./src/dbSetup");

const pool = new Pool({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

createTables(pool).catch((err) =>
  console.error("Error in createTables function:", err)
);
