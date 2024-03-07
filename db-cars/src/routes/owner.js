const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  router.get("/all", async (req, res) => {
    const client = await pool.connect();
    try {
      const query = `
      SELECT * FROM owners
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
