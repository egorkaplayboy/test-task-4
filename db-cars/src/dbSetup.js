// Создание таблиц в бд

const createTables = async (pool) => {
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

module.exports = {
  createTables,
};
