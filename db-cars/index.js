require("dotenv").config();
const { Pool } = require("pg");
const { createTables, populateTables } = require("./src/dbSetup");

const pool = new Pool({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const setupDatabase = async () => {
  await createTables(pool).catch((err) =>
    console.error("Error in createTables function:", err)
  );

  await populateTables(pool).catch((err) =>
    console.error("Error in populateTables function:", err)
  );

  await pool.end(); // Вызываем pool.end() здесь после завершения всех операций
};

setupDatabase();
