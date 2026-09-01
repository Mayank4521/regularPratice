const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const userModel = require("../models/auth.model")
const blacklistModel = require("../models/blacklist.model")

const registerController = async(req,res)=>{
    const {username,email,password,bio,profileImage} = req.body

    const isUserExist = await userModel.findOne({$or:[{username},{email}]})

    if(isUserExist){
        return res.status(400).json({
            message:"Username or email is already in use"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },process.env.JWT_SECRET,
    {expiresIn:"3d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"user registered successfully",
        user:{
            username:user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

const loginController= async (req,res) =>{
    const {username,email,password} = req.body

    const user = await userModel.findOne({$or:[{username},{email}]}).select("+password")

    if(!user){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username:user.username
    },process.env.JWT_SECRET,
    {expiresIn:"3d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"user loggedin successfully",
        user:{
            username:user.username,
            email: user.email,
            bio: user.bio,
            profileImage:user.profileImage
        }
    })

}

const getMeController =async (req,res) =>{
    const user= await userModel.findById(req.user.id)

    res.status(200).json({
        message:"user fetched successfully",
        user
    })
}


const logoutController = async(req,res) =>{
    const token = req.cookies.token

    res.clearCookie("token")
    await blacklistModel.create({token})

    res.status(200).json({
        message:"logout successful"
    })

}


module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController
}