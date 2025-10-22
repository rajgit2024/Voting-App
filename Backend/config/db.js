const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(client => {
    console.log(" Connected to PostgreSQL database successfully!");
    client.release();
  })
  .catch(err => console.error(" Error connecting to PostgreSQL:", err));

module.exports = pool;
