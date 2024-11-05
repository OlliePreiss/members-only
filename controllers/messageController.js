const db = require('../db/messageQuery');

async function messageListGet(req, res) {
  console.log("get message requests initiated");
  const messages = await db.getAllMessages();
  res.send("messages:" + messages.rows.map(message => message.title).join(", "));
}

module.exports = {
  messageListGet
}
