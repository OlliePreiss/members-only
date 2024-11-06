const bcrypt = require('bcryptjs')
const messagedb = require('../db/messageQuery');
const userdb = require('../db/userQuery');

function timeDifference(now, createdAt) {
  const createdAtDate = new Date(createdAt);
  const diffInMilliseconds = now - createdAt;
  const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
  const diffInHours = Math.floor(diffInMilliseconds / 3600000);
  const diffInDays = Math.floor(diffInMilliseconds / 86400000);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
}
}

async function messageListGet(req, res) {
  const messages = await messagedb.getAllMessages();
  const now = new Date();
  messages.forEach(message => {
    message.createdat = timeDifference(now, message.createdat)
  })

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
        const newUser = await userdb.insertUser(req.body);

        req.login(newUser, (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }
          return res.redirect("/");
        })
      }
    });
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
