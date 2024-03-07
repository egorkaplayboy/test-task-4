const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  router.get("/info", async (req, res) => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT cars.model, owners.name, ownership.purchase_date
        FROM cars
        JOIN ownership ON cars.id = ownership.car_id
        JOIN owners ON owners.id = ownership.owner_id;
      `;
      const result = await client.query(query);
      res.json(result.rows);
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  });

  router.get("/all", async (req, res) => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM cars
      `;
      const result = await client.query(query);
      res.json(result.rows);
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  });

  return router;
};
