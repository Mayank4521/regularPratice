const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Username is required"],
        unique: true 
    },
    email:{
        type:String,
        required: [true,"Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        select: false
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/7wuftbj1si/cs.png?updatedAt=1785645341802"
    }
})

const userModel = mongoose.model("users",userSchema)


module.exports = userModel