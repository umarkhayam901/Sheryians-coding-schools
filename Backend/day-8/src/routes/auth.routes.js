const express = require("express")
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");



const authRouter = express.Router();

/* 
REGISTER/API
post/auth/api 
*/

authRouter.post("/register", async(req,res)=>{

    const{name,email,password} = req.body

    const isUserAlreadyExisted = await userModel.findOne({email})

    if(isUserAlreadyExisted){
       return res.status(409).json({
            message : "user already existed on this email"
        })
    }

   const hash = crypto.createHash("MD5").update(password).digest("hex")

   const user = await userModel.create({
        name,
        email,
        password:hash,
    })


     const token = jwt.sign({
       id : user._id,
       email:user.email
    }, process.env.JWT_SECRET)


    res.cookie("JWT_SECRET",token)

    res.status(201).json({
        message : "user created succesfully",
        user,
        token

    })

})

/*
COOKIE/API
post/auth/api
*/

authRouter.post("/protected", (req,res)=>{

    console.log(req.cookies);
    res.status(200).json({
        message:"This route is protected"
    })
})

/*
LOGIN/API
post/auth/api
*/

authRouter.post("/login", async(req,res)=>{

    const {email,password} = req.body

    const user =  await userModel.findOne({email})

    if(!user){
        return res.status(401).json({
            message : "email not found "
        })
    }

    const isPasswordMatched = user.password == crypto.createHash("MD5").update(password).digest("hex")

    if(!isPasswordMatched){
        return res.status(401).json({
            message : "invalid password"
        })
    }

    const token = jwt.sign({
        id : user._id,
        email : user.email
    },process.env.JWT_SECRET)


    res.cookie("JWT_SECRET",token);
    if(isPasswordMatched){
        return res.status(200).json({
            message : "login successfull",
            user,
        })
    }



})














module.exports = authRouter;