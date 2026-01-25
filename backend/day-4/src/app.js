//server create krenge
//server config krenge
const express = require("express")

const app = express()

app.use(express.json())

const notes = [
    //title,description
]

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.send("notes created")
    console.log(notes)
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    
    res.send("note deleted successfully")
})  

app.patch("/notes/:index",(req,res)=>{
    
    notes[req.params.index].description = req.body.description
    
    res.send("Updated Successfully")
})
module.exports = app