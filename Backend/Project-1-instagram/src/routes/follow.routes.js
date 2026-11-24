const express = require("express")
const userFollowController = require("../controllers/follow.controllers");
const identifyUser = require("../middlewares/auth.middlewares");


const userFollowRouter = express.Router()

userFollowRouter.post("/follow/:username",identifyUser,userFollowController.userControllers)
userFollowRouter.delete("/unfollow/:username",identifyUser,userFollowController.unfollowController)
userFollowRouter.patch("/accept/:username",identifyUser,userFollowController.acceptFollowController)
userFollowRouter.patch("/reject/:username",identifyUser,userFollowController.rejectFollowController)

module.exports =userFollowRouter;