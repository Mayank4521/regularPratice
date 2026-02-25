const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique:[true,"username already exist"],
        required: [true,"please enter username"]
    },
    email: {
        type: String,
        unique: [true,"email already exist"],
        required: [true,"please enter email"]
    },
    password: {
        type:String,
        required: [true,"password is required"]
    },
    bio: String,
    profileImage: {
        type: String, 
        default: 'https://ik.imagekit.io/7wuftbj1si/avatar.webp'
    }
})

let userModel = mongoose.model("users",userSchema)

module.exports = userModel