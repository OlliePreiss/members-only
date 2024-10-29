const pool = require("./pool");

async function getAllUsers() {
  const rows = await pool.query("SELECT * FROM users")
  return rows;
}

async function findUsers(username) {
  const row = await pool.query("SELECT * FROM users WHERE username = ($1)", [username])
  return row;
}

async function insertUser(user) {
  // membership status will need to be managed separatley at some point
  // add error checking for each
  await pool.query("INSERT INTO users (fullName, username, password, membershipStatus) VALUES ($1, $2, $3, $4)", [user.fullName, user.username, user.password, user.membershipStatus])
}

async function deleteUser(username) {
  await pool.query("DELETE FROM users WHERE username = ($1)", [username])
}


module.exports = {
  getAllUsers,
  findUsers,
  insertUser,
  deleteUser
};
