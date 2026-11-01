const express =  require("express");
const notesModel =  require("./models/notes.model")



const app = express();
app.use(express.json())
/**post /notes / Data Create karna ha */

app.post("/notes", async (req,res)=>{
    const {title,description} = req.body

    const note = await notesModel.create({
        title,
        description
    })
    res.status(201).json({
        message : "notes created succesfully",
        note
    })

    /** Get/notes/ Data Fetch karna ha means dekhna ha */

    app.get("/notes", async(req,res)=>{
        const note =  await notesModel.find({
            title,
            description
        })
        res.status(200).json({
            message : "Data Fetch Successfully",
            note
        })
    })
})

module.exports = app;