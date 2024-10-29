const db = require('../db/userQuery')

async function userListGet(req, res) {
  console.log("get user requests initiated");
  const users = await db.getAllUsers();
  console.log("Users:" , users);
  res.send("Users:" + users.map(user => user.username).join(", "));
}


module.exports = {
  userListGet
}
