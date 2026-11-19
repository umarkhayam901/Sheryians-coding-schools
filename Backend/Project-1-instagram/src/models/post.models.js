const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: {
        type :String,
        default : ""
    },
    imgUrl:{
        type : String,
        require: [true , " imgUrl is required for creating an post"]
    },
    
    user: { 
        ref : "user",
        type : mongoose.Schema.ObjectId,
        require : [true, "user is require for creating and post"]

    }
})

const postModel = mongoose.model("post",postSchema)

module.exports = postModel