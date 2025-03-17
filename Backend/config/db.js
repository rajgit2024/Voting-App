const {Pool}=require("pg");
require('dotenv').config(); 

const pool=new Pool({
   user:process.env.PG_USER,
   database:process.env.PG_DATABASE,
   password:process.env.PG_PASSWORD,
   port:process.env.PG_PORT,
   host:process.env.PG_HOST,
   ssl: {
      rejectUnauthorized: false, // Important for Supabase and Render
    },
     connectionString: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}?hostaddr=0.0.0.0`
})

module.exports=pool;