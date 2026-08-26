const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middleware/auth.middleware")

//@route - POST /api/posts/
//@description - create posts
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

//@route - GET /api/posts/
//@description - fetch all posts
postRouter.get("/",identifyUser,postController.fetchPostsController)

//@route - GET /api/posts/details/:postId
//@description - fetch post details
postRouter.get("/details/:postId",identifyUser,postController.fetchPostDetailsController)

//@route - POST /api/posts/like/:postId
//@description - like a post
postRouter.post("/like/:postId",identifyUser,postController.likePostController)

postRouter.post("/unlike/:postId",identifyUser,postController.unlikePostController)

//@route - GET /api/posts/feed
//@description - fetch all posts
//@access - private
postRouter.get("/feed",identifyUser,postController.getFeedController)

module.exports = postRouter  