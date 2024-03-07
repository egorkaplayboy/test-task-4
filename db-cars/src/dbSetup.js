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
  }
};

// Присваивание данных к таблицам

const populateTables = async (pool) => {
  const client = await pool.connect();
  try {
    await client.query("INSERT INTO cars (model) VALUES ('BMW')");
    await client.query("INSERT INTO cars (model) VALUES ('Mercedes')");
    await client.query("INSERT INTO cars (model) VALUES ('Audi')");

    await client.query("INSERT INTO owners (name) VALUES ('Vasya Pupkin')");
    await client.query("INSERT INTO owners (name) VALUES ('Jenya Pushkin')");

    const carId1 = 1;
    const ownerId1 = 1;
    await client.query(
      `INSERT INTO ownership (car_id, owner_id, purchase_date) VALUES (${carId1}, ${ownerId1}, '2024-01-01')`
    );

    const carId2 = 2;
    const ownerId2 = 2;
    await client.query(
      `INSERT INTO ownership (car_id, owner_id, purchase_date) VALUES (${carId2}, ${ownerId2}, '2024-02-15')`
    );

    console.log("Data inserted into tables successfully.");
  } catch (err) {
    console.error("Error inserting data into tables:", err);
  } finally {
    client.release();
  }
};

module.exports = {
  createTables,
  populateTables,
};
