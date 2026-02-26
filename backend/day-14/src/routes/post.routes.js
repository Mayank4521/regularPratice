const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

// POST /api/posts/

postRouter.post("/",upload.single("Image"), postController.postCreateController)

//GET /api/posts
postRouter.get("/", postController.getPostController)

//GET /api/posts/details/:postid
// //to return the details of post and to check if the post is created by the user who is req

postRouter.get("/details/:postId",postController.getPostDetailsController)

module.exports = postRouter