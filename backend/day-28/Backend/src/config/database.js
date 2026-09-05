const mongoose = require("mongoose")

async function connecttoDb(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database is connected")
}

module.exports = connecttoDb