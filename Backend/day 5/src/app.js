const express = require('express');
const notesModel = require('./models/notes.model')
const app = express();


/** Post/notes /using database  */

app.use(express.json());


app.post("/api/notes",async (req,res)=>{
    const {title,description} = req.body;

    const notes = await notesModel.create({
        title,
        description
    })

    res.status(201).json({
        message : "notes create succesfully",
        notes
    })
})



   /**Get / notes / fetch all notes  */

    app.get("/api/notes", async (req,res)=>{
        const note = await notesModel.find();
        res.status(200).json({
            message : "notes fetch succesfully",
            note
        })
    })


    /** delete/api/notes */

    app.delete("/api/notes/:id", async(req,res)=>{

        const id = req.params.id;
       const notes = await notesModel.findByIdAndDelete(id);
        res.status(200).json({
            message : "notes deleted succesfully",
            notes
        })
    })

    /** update /api/notes/  */

   
app.patch("/api/notes/:id", async (req, res) => {

    const id = req.params.id;
    const { description } = req.body;

    const notes = await notesModel.findByIdAndUpdate(
        id,
        { description },
        { new: true }
    );

    res.status(200).json({
        message: "Description updated successfully",
        notes
    });

});




module.exports = app;