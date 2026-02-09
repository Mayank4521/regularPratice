const express = require("express")

const app = express()

app.use(express.json())

const notes = []


app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.post("/notes",(req,res)=>{
    notes.push(req.body)
    console.log(notes)

    res.send("notes created")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]

    res.send("deleted successful")
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description

    res.send("updated successfully")
})
module.exports= app