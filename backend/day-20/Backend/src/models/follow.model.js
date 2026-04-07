const mongoose =  require("mongoose")
const { create } = require("./user.model")

const followSchema = new mongoose.Schema({
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"follower is required"]
    },
    followee:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"followee is required"]
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","accepted","rejected"],
            message:"status is required"
        }
    }
},{timestamps:true})

followSchema.index({follower:1,followee:1},{unique: true})

const followModel = mongoose.model("follows",followSchema)

module.exports = followModel