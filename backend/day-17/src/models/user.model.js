const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true,"username already exist"],
        required:[true,"username is required"]
    },
    email:{
        type: String,
        unique: [true,"email already exist"],
        required:[true,"email is required"]
    },
    password:{
        type: String,
        require: [true,"password is required"]
    },
    bio:{
        type:String
    },
    profileImg: {
        type: String,
        default: "https://ik.imagekit.io/7wuftbj1si/avatar.webp"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel