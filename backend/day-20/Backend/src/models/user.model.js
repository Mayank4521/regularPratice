const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"username is required"],
        unique:true
    },
    email:{
        type:String,
        required: [true,"email is required"],
        unique:true
    },
    password:{
        type: String,
        required: [true,"password is required"],
        select:false
    },
    bio:{
        type: String
    },
    profilePic:{
        type: String,
        default: "https://ik.imagekit.io/7wuftbj1si/avatar.webp?updatedAt=1771049227193"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports =userModel