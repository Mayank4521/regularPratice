const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    followee:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{timestamps:true}
)

const followModel = mongoose.model("follow",followSchema)