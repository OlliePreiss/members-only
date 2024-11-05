const db = require('../db/userQuery')

async function userListGet(req, res) {
  console.log("get user requests initiated");
  const users = await db.getAllUsers();
  res.send("Users:" + users.rows.map(user => user.username).join(", "));
}


module.exports = {
  userListGet
}
