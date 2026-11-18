const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type :String,
        unique : [true,"username Already existed"],
        require :[true,"username required"] 
    },
    email : {
        type : String,
        unique: [true,"email already existed"],
        require:[true,"Email required"]
    },
    password : {
        type : String,
        require:[true,"password required"]
    },
    bio : String,
    profileImage :{
        type: String,
        default:"https://ik.imagekit.io/xsgadhazq/user%20default%20image.jpeg"
    } 

})


const userModel = mongoose.model("user",userSchema);


module.exports = userModel;