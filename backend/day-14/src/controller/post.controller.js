const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey: process.env.ImageKit_private_key
})

const postCreateController = async (req,res)=>{
    console.log(req.body, req.file)

    const token = req.cookies.token
   
    if(!token){
        return res.status(401).json({
            message:"token not provided,unauthorized access"
        })
    }

    let decode= null

    try{
    decode = jwt.verify(token,process.env.JWT_SECRET)}
    catch(err){
        return res.status(401).json({
            message:"unauthorized access"
        })
    }

    console.log(decode)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",
        folder: "cohort-2-insta-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decode.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })
    

}

async function getPostController(req,res){
    const token= req.cookies.token

    if(!token){
       return res.status(401).json({
        message:"UnAuthorized Access"
       })
    }

    let decoded = null

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
    return res.status(401).json({
            message: "Invalid token"
        })
    }
    const posts = await postModel.find({
        user: decoded.id
    })

    res.status(200).json({
        message:"Posts fetched successfully.",
        posts
    })
}

async function getPostDetailsController(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"UnAuthorized Access"
        })
    }

    let decoded
    try{
        decoded= jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"UnAuthorized Access"
        })
    }
    
    const userId = decoded.id
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