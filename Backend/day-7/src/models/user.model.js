const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : String,
    email:{
        type:String,
        unique:[true, "user already existed on this account"]
    },
    passward : String,
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel;