const { Router } = require('express');
const passport = require('passport')
const indexController = require('../controllers/indexController')

const indexRouter = Router()

indexRouter.get("/", indexController.messageListGet)
indexRouter.get("/sign-up", indexController.signUpGet)
indexRouter.post("/sign-up", indexController.signUpPost)
indexRouter.get("/log-in", indexController.logInGet)
indexRouter.post("/log-in", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/sign-up"
}))
indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/log-in")
  })
})

module.exports = indexRouter;
