const { Router } = require('express');
const messageController = require('../controllers/messageController')

const messageRouter = Router()

messageRouter.get("/", messageController.messageListGet)
messageRouter.post("/create", messageController.messageCreatePost)

module.exports = messageRouter;
