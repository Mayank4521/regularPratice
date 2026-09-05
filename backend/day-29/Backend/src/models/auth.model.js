const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique: [true,"username already taken"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique: [true,"email already taken"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select: false
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/7wuftbj1si/cs.png?updatedAt=1785645341802"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel