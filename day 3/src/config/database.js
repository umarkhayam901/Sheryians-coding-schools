const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://umarkhayam8275_db_user:zBD5e32nLhkzt0fG@cluster0.zwuykw9.mongodb.net/day-3")
    .then(()=>{
        console.log("Connected to Database Succesfully")
    })
}
module.exports = connectToDb;