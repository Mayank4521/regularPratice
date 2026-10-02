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

    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity",
        html:`<h1>Hi ${username}</h1><p>Thank you for registering with <strong>Perplexity</strong>. We are excited to have you on board.</p>
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