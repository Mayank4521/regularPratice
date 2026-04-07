const postModel = require("../models/post.model")
const likeModel = require("../models/like.model")
const jwt = require("jsonwebtoken")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey: process.env.ImageKit_private_key
})

async function createPostController(req,res){

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),"file"),
        fileName: "Test",
        folder: "cohort-insta-post-2"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: req.user.id
    })

    return res.status(201).json({
        message:"Post created successfully",
        post
    })

}

async function getPostsController(req,res){

    const posts = await postModel.findOne({
        user: req.user.id
    })

    if(!posts){
        return res.status(404).json({
            message:"Post not found"
        })
    }

    return res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
}

async function getPostDetailController(req,res){
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findOne(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }

    isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(401).json({
            message:"Unauthorized access not valid"
        })
    }

    return res.status(200).json({
        message:"Post fetched successfully",
        post
    })
}

async function likePostController(req,res){
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    
    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }

    const like = await likeModel.findOne({user:userId,post:postId})

    if(like){
        return res.status(400).json({
            message:"Post already liked"
        })
    }

    const newLike = await likeModel.create({
        user:userId,
        post:postId
    })

    return res.status(200).json({
        message:"Post liked successfully",
        newLike
    })
}

async function getFeedController(req,res){
    const post = await postModel.find().populate("user")

    return res.status(200).json({
        message:"Feed fetched successfully",
        post
    })
}

module.exports = {
    createPostController,
    getPostsController,
    getPostDetailController,
    likePostController,
    getFeedController
}