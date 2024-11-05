const session = require('express-session');

const sessionMiddleware = session({
  secret: "cats",
  resave: false,
  saveUninitialized: false
});

module.exports = sessionMiddleware
