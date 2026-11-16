const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email : {
        type : String,
        unique:[true, "user already existed on this email"]
    },
    password : String
})

const userModel = mongoose.model("registration", userSchema)

module.exports = userModel;