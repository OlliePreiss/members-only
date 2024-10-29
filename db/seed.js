const { Client } = require("pg")

const users = [{
  fullName: "Ollie Preiss",
  username: "olliepreiss",
  password: "password123",
  membershipStatus: true
  },{
    fullName: "Tom Smith",
    username: "tomsmith",
    password: "password123",
    membershipStatus: true
  },{
    fullName: "Bill Bryson",
    username: "billbryson",
    password: "password123",
    membershipStatus: false
  }
]

const messages = [{
  title: "Hi",
  body: "This is the body",
  user_id: 1,
  }, {
    title: "Hello",
    body: "This is the body",
    user_id: 1,
  }
]

async function populateUsers() {
  console.log("seeding users commenced");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: "members_only",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
  await client.connect();
  await client.query("INSERT INTO users (fullName, username, password, membershipStatus) VALUES ($1, $2, $3, $4)", [users[0].fullName, users[0].username, users[0].password, users[0].membershipStatus])
  await client.end();
  console.log("users seeding complete");
}

async function populateMessages() {
  console.log("messages seeding commenced");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: "members_only",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
  await client.connect();
  // const userId = await client.query("SELECT id FROM users")
  await client.query("INSERT INTO messages (title, body, createdAt, user_id) VALUES ($1, $2, NOW(), $3)",[messages[0].title,messages[0].body,messages[0].user_id])
  await client.end()
  console.log("mesages seeding complete")
}

// populateUsers();
populateMessages();
