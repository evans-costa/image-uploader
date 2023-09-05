const pg = require("pg");
require("dotenv").config();

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("Connected to the Database.");
});

const createTables = async () => {
  const imageTable = `CREATE TABLE IF NOT EXISTS
    images(
      id SERIAL PRIMARY KEY,
      title VARCHAR(128) NOT NULL,
      cloudinary_id VARCHAR(128) NOT NULL,
      image_url VARCHAR(128) NOT NULL
    );`;

  try {
    const result = await pool.query(imageTable);
    console.log(result);
    await pool.end();
  } catch (err) {
    console.error(err);
  }
};

pool.on("remove", () => {
  console.log("Client removed");
});

module.exports = {
  createTables,
  pool,
};

require("make-runnable");
