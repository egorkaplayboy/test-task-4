require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const createTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS cars(id SERIAL PRIMARY KEY, model VARCHAR(256) NOT NULL)"
    );
    await client.query(
      `CREATE TABLE IF NOT EXISTS owners(
          id SERIAL PRIMARY KEY,
          name VARCHAR(256) NOT NULL
      )`
    );
    await client.query(
      `CREATE TABLE IF NOT EXISTS ownership(
          car_id INTEGER,
          owner_id INTEGER,
          purchase_date DATE,
          sale_date DATE,
          FOREIGN KEY (car_id) REFERENCES cars (id) ON DELETE CASCADE,
          FOREIGN KEY (owner_id) REFERENCES owners (id) ON DELETE CASCADE
      )`
    );
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    client.release();
    await pool.end();
  }
};

createTable().catch((err) =>
  console.error("Error in createTable function:", err)
);
