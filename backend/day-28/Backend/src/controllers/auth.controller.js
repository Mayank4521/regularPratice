const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../models/auth.model")
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")

const registerUser= async(req,res)=>{
    const {username,email,password,bio,profileImage} = req.body

    const isUserAlreadyExist = await userModel.findOne({$or:[{username},{email}]})

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"user already exist"
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
    {expiresIn:"3d"}
)

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

const loginUser = async(req,res)=>{
    const {username,email,password} = req.body

    const user = await userModel.findOne({$or:[{email},{username}]}).select("+password")

    if(!user){
        return res.status(404).json({
            message:"username or email does not exist"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,
    {expiresIn:"3d"})

    res.cookie("token",token)

    res.status(201).json({
        message:"user loggedin successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

const getMe = async(req,res)=>{
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"user fetched successfully",
        user
    })
}

const logoutUser = async(req,res)=>{
    const token = req.cookies.token

    res.clearCookie("token")
    await redis.set(token, Date.now().toString(), "EX", 60*60)

    res.status(200).json({
        message:"logout successful"
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}