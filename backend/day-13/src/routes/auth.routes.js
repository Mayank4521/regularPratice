//api- to register user
const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const crypto = require("crypto")

const authRouter = express.Router()

// /api/auth/register

authRouter.post("/register",async (req,res)=>{
    const {name,email,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exist"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name,email,password:hash})

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,{
        expiresIn:"1h"
    }
)

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })

})

//user kon hai
authRouter.get("/get-me",async (req,res)=>{
    const token = req.cookies.jwt_token

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findById(decoded._id)

    res.json({
        name:user.name,
        email:user.email,
    })

})

// /api/auth/login

authRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const isPasswordCorrect = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordCorrect){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"logged in",
        user
    })
})

module.exports = authRouter