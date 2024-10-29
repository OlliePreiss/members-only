const express = require('express')
const session = require('express-session')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const app = express();

app.get("/", (req,res) => res.send("Hello world"));

app.listen(3005);
