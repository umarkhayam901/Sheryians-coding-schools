const express = require("express");

const app = express();
app.use(express.json());


const notes = [];

app.get("/",(req,res)=>{
    res.send("hello world")
})

/* post api for notes */

app.post("/notes",(req,res)=>{

    console.log(req.body)
    notes.push(req.body)
    res.send("notes created")
     console.log(notes)
})
/* get api for notes */

app.get("/notes",(req,res)=>{
   res.send(notes)
   console.log(notes)
})


app.delete("/notes/:index",(req,res)=>{
    delete notes [req.params.index]
    res.send("notes deleted successfully")
})

module.exports = app