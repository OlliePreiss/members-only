const pool = require('./pool');

async function getAllMessages() {
  const response = await pool.query(
    `SELECT messages.title, messages.body, messages.createdAt, users.username
    FROM messages
    JOIN users ON messages.user_id = users.id`
    )
  const rows = response.rows
  return rows;
}

module.exports = {
  getAllMessages
}
