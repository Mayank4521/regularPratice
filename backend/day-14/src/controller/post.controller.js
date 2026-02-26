const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey: process.env.ImageKit_private_key
})

const postCreateController = async (req,res)=>{
    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",
        folder: "cohort-2-insta-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: res.user.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })
    

}

async function getPostController(req,res){
    
    const userId = res.user.id
    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message:"Posts fetched successfully.",
        posts
    })
}

async function getPostDetailsController(req,res){
    
    
    
    const userId = res.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found."
        })
    }

    const isValiduser = post.user.toString() === userId

    if(!isValiduser){
        return res.status(403).json({
            message:"Forbidden Content"
        })
    }

    return res.status(200).json({
        message:"details fetched successfully",
        post
    })

}

module.exports = {
    postCreateController,
    getPostController,
    getPostDetailsController
}