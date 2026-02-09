//server ko start
//server ko config

const express= require("express")

const app = express()

app.use(express.json())

const notes = []

//post /notes
app.post("/notes",(req,res)=>{
   notes.push(req.body)

   res.status(201).json({
    message: "note created successfully"
   })
})

//get /notes
app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes: notes
    })
})

app.delete("/notes/:mama",(req,res)=>{
    delete notes[req.params.mama]

    res.status(204).json({
        message:"Note deleted successfully"
    })
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description

    res.status(200).json({
        message:"Note updated successfully"
    })
})

module.exports = app