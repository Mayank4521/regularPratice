const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


async function registerController(req,res){
    let{username,email,password,bio,profileImage}= req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
        {email},
        {username}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User Already Exists" + (isUserAlreadyExists.email == email ? "Email already exist": "Username already exist")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,
    {expiresIn: "1d"})

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}
async function loginController(req,res){
    const {username,email,password} = req.body

    //username,password
    //email,password

    const user = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        return res.status(401).json({
            message:"Invalid password"
        })
    }
    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"user loggedIn successfully",
        user:{
            email:user.email,
            username: user.username
        }
    })

}

module.exports = {
    registerController,
    loginController
}