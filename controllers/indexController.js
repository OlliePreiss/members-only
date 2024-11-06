const bcrypt = require('bcryptjs')
const messagedb = require('../db/messageQuery');
const userdb = require('../db/userQuery');

async function messageListGet(req, res) {
  const messages = await messagedb.getAllMessages();
  res.render("index", {
    messages: messages,
    user: req.user
  })
}

async function signUpGet(req, res) {
  res.render("sign-up")
}

async function signUpPost(req, res, next) {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err)  {
        next(err)
      } else {
        req.body.password = hashedPassword
        await userdb.insertUser(req.body);
      }
    });
    res.redirect("/")
  } catch (error) {
    next(error);
  }
}

async function logInGet(req, res) {
  res.render("log-in")
}

module.exports = {
  messageListGet,
  signUpGet,
  signUpPost,
  logInGet
}
