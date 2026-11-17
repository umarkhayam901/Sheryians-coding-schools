const express =  require("express");
const userModel = require("../models/user.model")
const crypto = require("crypto");
const jwt = require("jsonwebtoken");



userModel();

const authRouter = express.Router();
/* post/api   register*/
authRouter.post("/register", async (req,res)=>{
    const {name,email,password} =req.body

    const isUserExisted =  await userModel.findOne({email})

    if(isUserExisted){
        return res.status(409).json({
            message: "User Already Existed "
        })
    }

    const user = await userModel.create({
        name, 
        email, 
        password :crypto.createHash("MD5").update(password).digest("hex")
    })
    
    const token = jwt.sign({
        id : user._id,
        email : user.email
    }, process.env.JWT_SECRET, {expiresIn : "1h"}) 

     res.cookie("token", token, )


     res.status(201).json({
        message : "User Register Succesfully",
        user : {
            name : user.name,
            email: user.email
        }
     })

})
/**get/api   user ka data fetch karna ha  */
authRouter.get("/get-me", async (req,res)=>{
  const token =   req.cookies.token;
  const decode = jwt.verify(token,process.env.JWT_SECRET)

  const user = await userModel.findById(decode.id)

  res.status(200).json({

    message: "user find succesfully",
    user : {
        name : user.name,
        email: user.email
    }
  })
})

/**post api login  */

authRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body

    const user  = await userModel.findOne({email})

    if(!user){
        return res.status(401).json({
            message : "invalid Email"
        })
    }
    const hash = crypto.createHash("MD5").update(password).digest("hex")


    const isPasswordValid = hash === password;
    
    const token = jwt.sign({
        user : user._id 
    },process.env.JWT_SECRET)

    res.cookie("token",token)
    res.status(200).json({
        message : "User Login Succesfully",
        user: {
            name : user.name,
            email :user.email,
            
        }
    })
})

module.exports = authRouter;
