const express = require("express")
const postController = require("../controller/post.controller")
const multer =require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

const postRouter = express.Router()

//@route POST /api/posts
//@description - create a post with content and image provided in the req.body and req.file
postRouter.post("/",upload.single("Image"),identifyUser, postController.createPostController)

//@route GET /api/posts
//@description - fetch all post created by the user
postRouter.get("/", identifyUser, postController.getPostController)

//@route GET /api/posts/details/:postId
//@description - return details about the specific post user wants
postRouter.get("/details/:postId",identifyUser , postController.getPostDetailsController)

//@route POST /api/posts/likes/:postId
//@descrition - like a post with the id provided in req.params
postRouter.post("/likes/:postId",identifyUser,postController.likePostController)

module.exports = postRouter