const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "trolley.proxy.rlwy.net",
  database: "railway",
  password: "LInCyeAQbpPrbuKKrKgaXoqDBbkhPJtm",
  port: 1
});

module.exports = pool;
