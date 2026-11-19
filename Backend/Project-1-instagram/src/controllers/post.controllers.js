const { ImageKit, toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.models");

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

    res.status(201).json({
        message: "Image uploaded successfully",
        fileId: file.fileId,
        name: file.name,
        filePath: file.filePath,
        fileUrl: file.url,
        thumbnailUrl: file.thumbnailUrl,
        fileType: file.fileType,
        size: file.size,
        height: file.height,
        width: file.width
    });
}

module.exports = {
    createPostController
};