const express = require("express")
const userFollowController = require("../controllers/follow.controllers");
const identifyUser = require("../middlewares/auth.middlewares");


const userFollowRouter = express.Router()

userFollowRouter.post("/follow/:username",identifyUser,userFollowController.userControllers)
userFollowRouter.delete("/unfollow/:username",identifyUser,userFollowController.unfollowController)

module.exports =userFollowRouter;