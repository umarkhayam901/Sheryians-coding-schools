const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: {
        type :String,
        default : ""
    },
    imgUrl:{
        type : String,
        required: [true , " imgUrl is required for creating an post"]
    },
    
    user: { 
        ref : "user",
        type : mongoose.Schema.ObjectId,
        required : [true, "user is required for creating a post"]

    }
})

const postModel = mongoose.model("post",postSchema)

module.exports = postModel