const userModel = require('../models/user.models');
const jwt = require("jsonwebtoken")
const crypto = require("crypto")



async function registerController(req,res){

    const{username,email,password,bio,profileImage} = req.body

    /*// const isUserExistsByUsername = await userModel.findOne({username})

    // if(isUserExistsByUsername){
    //     return res.status(409).json({
    //         message : "User already Exists with this Username "
    //     })
    // }

    // const isUserExistsByEmail  = await userModel.findOne({email})

    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         message : "user already existed with this email"
    //     })
    // }



**/

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExists){
       return res.status(409).json({
        message : "User already Exists" + isUserAlreadyExists.email ==email ?
        "Email already Exist" : "Username Already Exists" 
       })
    }

    const user = await userModel.create({
        username,
        email,
        password : crypto.createHash("SHA-256").update(password).digest('hex'),
        bio,
        profileImage

    })

    const token = jwt.sign({
        id : user._id
    }, process.env.JWT_SECRET, {expiresIn : "1d"})

    res.cookie("token",token);

    res.status(201).json({
        message : "User Register Succesfully",
       user : {
        email : user.email,
        username: user.username,
        bio : user.bio,
        profileImage : user.profileImage
       }
    })

}

async function loginController(req,res){

    const {email,password} = req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message : "User not exists"
        })
    }

    const hash = crypto.createHash("SHA-256").update(password).digest('hex')

    const isPasswordValid = hash === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message : "Invalid Password"
        })
    }

    const token = jwt.sign({
        id : user._id,
    },process.env.JWT_SECRET,{expiresIn : "1d"})

    res.cookie("Token",token)
    res.status(200).json({
        message : "User login Succcesfully",
        user :{
            username : user.username,
            email : user.email,
            bio : user.bio,
            profileImage  : user.profileImage
        }
    })
}





module.exports = {
    registerController,
    loginController,
}