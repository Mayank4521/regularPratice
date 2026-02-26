const express = require("express")
const postController = require("../controller/post.controller")
const multer =require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

const postRouter = express.Router()

//create post
postRouter.post("/",upload.single("Image"),identifyUser, postController.createPostController)

postRouter.get("/", identifyUser, postController.getPostController)

postRouter.get("/details/:postId",identifyUser , postController.getPostDetailsController)

module.exports = postRouter