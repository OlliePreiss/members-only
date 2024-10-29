const express = require('express')

const userRouter = require('./routes/userRouter')

const app = express();

app.get("/", (req,res) => res.send("Hello world"));
app.get("/users", userRouter)

app.listen(3005);
