import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { sendEmail } from "../services/mail.service.js"

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body { username, email, password }
 * @returns { message, success, user }
 */
export const registerUser = async (req,res) =>{
    const {username,email,password} = req.body

    const isUserExist = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isUserExist){
        return res.status(400).json({
            message:'user already exist via username or email',
            successs:false,
            err:"user already exist"
        })
    }

    const user = await userModel.create({
        username,
        email,
        password
    })

    const emailVerificationToken = jwt.sign({
        email:user.email
    },process.env.JWT_SECRET)

    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity",
        html:`<h1>Hi ${username}</h1><p>Thank you for registering with <strong>Perplexity</strong>. We are excited to have you on board.</p>
        <p>To complete your registration, please verify your email address by clicking the link below:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
        <p>If you did not register for an account, please ignore this email.</p>
        <p>Best Regards,<br>Perplexity Team</p>`,
    }
    )

    res.status(201).json({
        message:"user registered successfully",
        success:true,
        user:{
            _id:user._id,
            username:user.username,
            email:user.email,
            verified:user.verified
        }
    })
}

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 * @body { email, password }
 * @returns { message, success, user }
 */
export const loginUser = async (req,res) =>{
    const {email,password} = req.body

    const user = await userModel.findOne({ email }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"Invalid credentials",
            success:false,
            err:"user not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid credentials",
            success:false,
            err:"password does not match"
        })
    }
    
    if(!user.verified){
        return res.status(400).json({
            message:"please verify your email before logging in",
            success:false,
            err:"email not verified"
        })
    }
    const token = jwt.sign({
        _id:user._id,
        username:user.username,
    },process.env.JWT_SECRET,{
        expiresIn:"7d"
    })   
    
    res.cookie("token",token,{
        httpOnly:true,
    })

    res.status(200).json({
        message:"user logged in successfully",
        success:true,
        user:{
            _id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * @desc get current logged in user details
 * @route GET /api/auth/get-me
 * @access Private
 * @returns { message, success, user }
 */

export const getMe = async (req,res) =>{
    const userId = req.user._id

    const user = await userModel.findById(userId)

    if(!user){
        return res.status(404).json({
            message:"user not found",
            success:false,
            err:"user not found"
        })
    }

    res.status(200).json({
        message:"user fetched successfully",
        success:true,
        user:user
    })
}


/**
 * @desc Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token }
 */
export const verifyEmail = async (req,res) =>{
    const {token} = req.query

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findOne({email:decoded.email})
        
        if(!user){
            return res.status(400).json({
                message:"Invalid token",
                success:false,
                err:"user not found"
            })
        }
        
        user.verified = true
        await user.save()

        const html = `<h1>Email Verified</h1><p>Hi ${user.username},</p><p>Your email address has been successfully verified. You can now log in to your account.</p><p>Best Regards,<br>Perplexity Team</p>`

        return res.send(html)
    }catch(err){
        return res.status(400).json({
            message:"Invalid or expired token",
            success:false,
            err:err.message
        })
    }

}