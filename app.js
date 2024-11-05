const express = require('express');
const path = require('node:path');

const userRouter = require('./routes/userRouter')
const messageRouter = require('./routes/messageRouter')
const indexRouter = require('./routes/indexRouter')
require("dotenv").config();

const app = express();
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get("/", indexRouter);
app.use("/users", userRouter)
app.use("/messages", messageRouter)

app.listen(3005);
