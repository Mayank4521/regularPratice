const express = require("express")
const userController = require("../controller/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

//post /api/users/follow/:username
//follow a user
//@access- private
userRouter.post("/follow/:username",identifyUser, userController.followUserController)

//Delete / api/users/follow/:username
//@description - unfollow user
//@access - private
userRouter.delete("/follow/:username",identifyUser,userController.unfollowUserController)


//GET /api/users/follow/requests
//get all follow requests
//@access -private
userRouter.get("/follow/requests",identifyUser,userController.getFollowRequestsController)

//PATCH /api/users/follow/requests/:username/accept
//accept follow request
//@access - private
userRouter.patch("/follow/requests/:username/accept",identifyUser,userController.acceptFollowRequestController)

//PATCH /api/users/follow/requests/:username/reject
//reject follow request
//@access - private
userRouter.patch("/follow/requests/:username/reject",identifyUser,userController.rejectFollowRequestController)   

module.exports = userRouter