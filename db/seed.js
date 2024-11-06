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
  body: "This is the body",
  user_id: 5,
  }, {
    body: "This is the body",
    user_id: 6,
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
  for (const user of users) {
    await client.query("INSERT INTO users (fullName, username, password, membershipStatus) VALUES ($1, $2, $3, $4)", [user.fullName, user.username, user.password, user.membershipStatus])
  };
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
  for (const message of messages) {
    await client.query("INSERT INTO messages (title, body, createdAt, user_id) VALUES ($1, $2, NOW(), $3)",[message.title,message.body,message.user_id])
  };
  await client.end()
  console.log("mesages seeding complete")
}

async function seed() {
  await populateUsers();
  populateMessages();
}

seed();
