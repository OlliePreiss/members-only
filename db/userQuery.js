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
  try {
    await pool.query("INSERT INTO users (fullName, username, password, membershipStatus) VALUES ($1, $2, $3, true)", [user.fullName, user.username, user.password])
    return;
  } catch(err) {
    throw err;
  }
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
