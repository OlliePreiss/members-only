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

async function insertMessage(message, user_id) {
  try {
    const response = await pool.query(
      'INSERT INTO messages (title, body, createdAt, user_id) VALUES ($1, $2, NOW(), $3)',
      [
        message.title,
        message.body,
        user_id
      ]
    )
    return;
  } catch(err) {
    throw err;
  }
}


module.exports = {
  getAllMessages,
  insertMessage
}
