const express = require('express');
const pool = require("./db/pool");
const path = require('node:path');

const session = require('./config/session');
const passport = require('./config/passport')
const userRouter = require('./routes/userRouter')
const messageRouter = require('./routes/messageRouter')
const indexRouter = require('./routes/indexRouter')
require("dotenv").config();

// App
const app = express();
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session
app.use(session);

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }))

// Routers
app.use("/", indexRouter);
app.use("/users", userRouter)
app.use("/messages", messageRouter)

app.listen(3005);
