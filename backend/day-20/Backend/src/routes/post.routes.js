const express = require("express")
const postController = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

const postRouter = express.Router()

// POST /api/posts/
//create post
postRouter.post("/",upload.single("Image"), identifyUser ,postController.createPostController)

//GET /api/posts/
//fetch all posts
postRouter.get("/",identifyUser,postController.getPostsController)

//GET /api/posts/feed
//get all the posts in db
//access - private
postRouter.get("/feed",identifyUser,postController.getFeedController)

//GET /api/posts/:id
//fetch single post
postRouter.get("/:id",identifyUser,postController.getPostDetailController)

//POST /api/posts/likes/:postId
//like post
postRouter.post("/likes/:postId",identifyUser,postController.likePostController)


module.exports = postRouter
