const express =  require("express");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
    const {name,email,passward} = req.body
    
    const isUserAlreadyExisted = await userModel.findOne({email})

    if(isUserAlreadyExisted){
       return res.status(400).json({
            message : "User already existed on this email"
        })
    }


    const user = await userModel.create({
        name,
        email,
        passward
    })


    const token = jwt.sign({
        id : user._id,
        email: user._email
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token);



    res.status(201).json({
        message : "Users register succesfully",
        user,
        token
        
    })
})



module.exports = authRouter;
