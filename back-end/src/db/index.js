const { Client } = require("pg");
const { Pool } = require("pg");
require('dotenv').config()

const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?sslmode=disable`
const pool = new Pool ({
  connectionString
})

module.exports = pool;