const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : [true, "email already existed"]
    },
    password : String 
})

const userModel = mongoose.model("user_registration", userSchema);

module.exports = userModel;
