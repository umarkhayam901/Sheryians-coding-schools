const express =  require("express");
const notesModel = require("./models/notes.model")


const app = express();
app.use(express.json());


/** post/ notes / req.body me data ana ha or database me store karana ha   */
app.post("/notes",async (req,res)=>{
    const {title,description} = req.body

    const note = await notesModel.create({
        title,description
    })
    res.status(201).json({
        message : "note created succesfully",
        note
    })
})

module.exports = app