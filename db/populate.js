const { Client } = require("pg")

const CREATEDBS = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fullName VARCHAR ( 255 ),
  username VARCHAR ( 255 ) UNIQUE,
  password VARCHAR ( 255 ),
  membershipStatus BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  body VARCHAR ( 255 ),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
)`

async function main() {
  console.log("db creation commenced");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: "members_only",
    password: process.env.DB_PASSWORD,
    port: 5432
  });
  await client.connect();
  await client.query(CREATEDBS);
  await client.end();
  console.log("db creation complete");
}

main();
