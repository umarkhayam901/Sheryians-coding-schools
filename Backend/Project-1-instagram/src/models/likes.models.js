const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    user :{
        type:String,
        required : [true,"user required"]
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:[true,"likes id is  required "]
    }
},{timestamps:true}
)

likesSchema.index({user:1,post:1},{unique:true})

const likeModel = mongoose.model("likes",likesSchema)

module.exports = likeModel