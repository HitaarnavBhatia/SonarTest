const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "student_management",
  password: "819299",
  port: 5432
});

module.exports = pool;
