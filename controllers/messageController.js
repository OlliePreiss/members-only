const db = require('../db/messageQuery');

async function messageListGet(req, res) {
  const messages = await db.getAllMessages();
  console.log(messages)
  res.render("index", { messages: messages })
}

async function messageCreatePost(req, res, next) {
  try {
    await db.insertMessage(req.body, req.session.passport.user)
    res.redirect("/");
  } catch(err) {
    next(err)
  }
}

module.exports = {
  messageListGet,
  messageCreatePost
}
