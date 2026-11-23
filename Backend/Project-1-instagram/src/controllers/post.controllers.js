const { ImageKit, toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.models");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/likes.models");


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


async function createPostController(req, res) {

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
        user : req.user.id
    })

    res.status(201).json({
        message : "Post Created Succesfully",
        post,
    })
}

async  function getAllPostController(req,res){

    const userId = req.user.id;

   const post  = await postModel.find({
    user : userId
   })

   res.status(200).json({
    message : "Users Post",
    post,
   })
}

async function postDetailsController(req,res){


    const userId = req.user.id;
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

async function postlikesController(req, res) {

    const userId = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message : "Post Not Found"
        })
    }


    const isliked= await likeModel.create({
        user:userId,
        post:postId
    })
    res.status(200).json({
        message : "Post liked Succesfully",
        isliked,
    })

  

}

module.exports = {
    createPostController,
    getAllPostController,
    postDetailsController,
    postlikesController
};