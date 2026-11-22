const express = require("express")
const postController = require("../controllers/post.controllers")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

const postRouter = express.Router();



/**post Api/ Creating Post */
postRouter.post("/",upload.single("image"),postController.createPostController)

/** Get all Post */
postRouter.get("/",postController.getAllPostController)

/**Details /post/ fetch /user/post  */
postRouter.get("/details/:postId",postController.postDetailsController)


module.exports = postRouter