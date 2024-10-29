const { Pool } = require("pg")

module.exports = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: "members_only",
  password: process.env.DB_PASSWORD,
  port: 5432
})
