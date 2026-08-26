const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },
    imgUrl:{
        type: String,
        required: [true,"img_Url is required for creating a post"]
    },
    userId:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User id is required"]
    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel