const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_Hu2dfboj9vZC@ep-white-sea-a5fifpe6-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false, // Required for Neon connections
  },
});

module.exports = pool;
