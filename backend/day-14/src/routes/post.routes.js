const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

// /api/post/

postRouter.post("/",upload.single("Image"), postController.postCreateController)

module.exports = postRouter