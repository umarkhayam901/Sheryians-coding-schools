const { ImageKit, toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.models");
const jwt = require("jsonwebtoken");
const { post } = require("../routes/post.routes");


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


async function createPostController(req, res) {


    const token = req.cookies.token

    if(!token){
        return res.status(201).json({
            message : "Token not Found, Unauthorized access "
        })
    }


    let decoded = null;

    try{
    decoded = await jwt.verify(token, process.env.JWT_SECRET)
}catch(err){

    return res.status(401).json({
        message : "invalid token, unauthorized"
    })
}
    console.log(decoded);


    const imageFile = await toFile(
        req.file.buffer,
        req.file.originalname,
        { type: req.file.mimetype }
    );

    const file = await client.files.upload({
        file: imageFile,
        fileName: req.file.originalname,
        folder: "/instagram/posts"
    });

   


   const post = await postModel.create({
        caption : req.body.caption,
        imgUrl : file.url,
        user : decoded.id
    })

    res.status(201).json({
        message : "Post Created Succesfully",
        post,
    })
}

async  function getAllPostController(req,res){


    const token = req.cookies.token

    let decoded ;
    try{
          decoded =   jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message : "unauthorized access"
        })
    }
   


    const userId = decoded.id

   const post  = await postModel.find({
    user : userId
   })

   res.status(200).json({
    message : "Users Post",
    post,
   })
}

async function postDetailsController(req,res){

    const token =  req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Unauthorized, Token Not Found  "
        })
    }

    let decoded ;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message : "Invalid Token"
        })
    }

    const userId = decoded.id;
    const postId = req.params.postId


   const post = await postModel.findById(postId)

   if(!post){
    return res.status(404).json({
        message  : "Post Not Found",
    })
   }


   const isValidUser = post.user.toString() ===  userId

   if(!isValidUser){
    return res.status(403).json({
        message : "Forbidden Post"
    })
   }

   res.status(200).json({
    message : "Post fetched Succesfully",
    post,
   })




}

module.exports = {
    createPostController,
    getAllPostController,
    postDetailsController
};