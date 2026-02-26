const  userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerController(req,res){
    const {username,email,password,bio,profileImg} = req.body

    isUserAlreadyExist = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User Already Exists" + (isUserAlreadyExist.email == email? "Email already exist": "Username already exist")
        })
    }

    const hash = await bcrypt.hash(password , 10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImg
    })

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,
    {expiresIn: "1d"}
    )

    res.cookie("token",token)
    
    res.status(201).json({
        message:"Registration Successful",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImg: user.profileImg
        }
    })

}

async function loginController(req,res){
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or: [
            {email:email},
            {username:username}
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"login successful.",
        user:{
            username: user.username,
            email: user.email
        }
    })

}

module.exports = {
    registerController,
    loginController
}