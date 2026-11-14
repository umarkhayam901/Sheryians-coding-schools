const express = require("express")
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken");


const authRouter = express.Router();

authRouter.post("/register", async(req,res)=>{

    const{name,email,password} = req.body

    const isUserAlreadyExisted = await userModel.findOne({email})

    if(isUserAlreadyExisted){
       return res.status(409).json({
            message : "user already existed on this email"
        })
    }

   

   const user = await userModel.create({
        name,
        email,
        password
    })


     const token = jwt.sign({
       id : user._id,
       email:user._email
    }, process.env.JWT_SECRET)


    res.cookie("JWT_SECRET",token)

    res.status(201).json({
        message : "user created succesfully",
        user,
        token
    })

})

module.exports = authRouter;