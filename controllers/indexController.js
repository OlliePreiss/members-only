const db = require('../db/messageQuery');

async function messageListGet(req, res) {
  const messages = await db.getAllMessages();
  console.log(messages)
  res.render("index", { messages: messages })
}

module.exports = {
  messageListGet
}
