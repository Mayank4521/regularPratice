const express = require("express")
const userRouter = express.Router()
const userController = require("../controller/user.controller")
const identifyUser = require("../middleware/auth.middleware")

// @route POST - /api/users/follow/:followingId
// @description - follow a user
// @access - private
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

// @route DELETE - /api/users/follow/:followingId
// @description - follow a user
// @access - private
userRouter.delete("/unfollow/:username",identifyUser,userController.unfollowUserController)

// @route POST - /api/users/follow/allrequests
// @description - fetch all follow requests with pending status
// @access - private
userRouter.get("/follow/allrequests",identifyUser,userController.fetchAllFollowRequestsController)

// @route PATCH - /api/users/follow/requests/accept/:requestId
// @description - to accept the follow request
// @access - private
userRouter.patch("/follow/requests/accept/:followerid",identifyUser,userController.acceptRequestController)

// @route Delete - /api/users/follow/reject/:followername
// @description - to reject the follow request
// @access - private
userRouter.delete("/follow/requests/reject/:followerid",identifyUser,userController.rejectRequestController)

//@route GET - /api/users/follow/followers
//@description - fetch all followers
//@access - private
userRouter.get("/follow/followers",identifyUser,userController.fetchFollowersController)

//@route GET - /api/users/follow/following
//@description - fetch all followings
//@access - private
userRouter.get("/follow/followings",identifyUser,userController.fetchFollowingController)

//@route GET - /api/users/suggestedusers
//@description - fetch the current user details
//@access - private
userRouter.get("/suggestedusers",identifyUser,userController.fetchAllUsersController)


module.exports = userRouter