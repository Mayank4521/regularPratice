const express = require("express")
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://Mayank:nDAAlteAedSOjLTn@cluster0.3cdcslw.mongodb.net/").then(()=>{
        console.log("Connected to Database")
    })
}
connectToDb()

const app = express()

module.exports = app