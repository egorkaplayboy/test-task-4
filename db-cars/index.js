require("dotenv").config();
const { Pool } = require("pg");
const express = require("express");
const { createTables, populateTables } = require("./src/dbSetup");
const carsRoutes = require("./src/routes/cars");
const ownerRoutes = require("./src/routes/owner");
const ownershipRoutes = require("./src/routes/ownership");
const allRoutes = require("./src/routes/all");

const app = express();
const PORT = 4000 | process.env.SERVER_PORT;

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
};

setupDatabase();

app.use("/api", allRoutes(pool));
app.use("/api/cars", carsRoutes(pool));
app.use("/api/owner", ownerRoutes(pool));
app.use("/api/ownership", ownershipRoutes(pool));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
