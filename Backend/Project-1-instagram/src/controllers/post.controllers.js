const { ImageKit, toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.models");
const jwt = require("jsonwebtoken")


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req, res) {


    const token = req.cookies.Token

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

module.exports = {
    createPostController
};