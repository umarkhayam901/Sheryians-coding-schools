const express = require("express");





const app = express()
app.use(express.json());
const notes = []
/*data create krna ha / post method use hoga  /api k name notes ha  */

app.post("/notes",(req,res)=>{
   notes.push(req.body)
   res.status(201).json({
    "messages":"notes create succesfully"
   })
})

/*get/notes */
app.get("/notes",(req, res)=>{

    res.status(200).json({
        notes:notes
    })
})

/*deletes/notes */
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.status(201).json({
     "message":"Note Deleted succesfully"
    })
})
/*uodate/notes */
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index] = req.body
    res.status(201).json({
     "message":"Note Updated succesfully"
    })
    
})



module.exports =  app