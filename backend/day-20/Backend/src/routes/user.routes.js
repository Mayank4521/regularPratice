const express = require("express")
const userController = require("../controller/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

//POST - /api/users/follow/:id
//follow user
userRouter.post("/follow/:userId",identifyUser,userController.followController)

//POST -/api/users/follow/:userId
userRouter.delete("/unfollow/:userId",identifyUser,userController.unfollowUserController)

//GET -/api/users/follow/requests
userRouter.get("/follow/requests",identifyUser,userController.getFollowRequestsController)

//PATCH - /api/users/follow/requests/:userId/accept
//accept follow request
userRouter.patch("/follow/requests/:userId/accept",identifyUser,userController.acceptFollowRequestController)

//PATCH - /api/users/follow/requests/:userId/reject
//reject follow request
userRouter.patch("/follow/requests/:userId/reject",identifyUser,userController.rejectFollowRequestController)

module.exports = userRouter