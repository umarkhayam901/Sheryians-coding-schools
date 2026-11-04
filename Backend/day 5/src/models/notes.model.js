const mongoose = require('mongoose');

const noteSchema =  new mongoose.Schema({
    title :"string",
    description : "string"
})

const notesModel =  mongoose.model("notes",noteSchema)

module.exports = notesModel;