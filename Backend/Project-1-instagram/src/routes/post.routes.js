const express = require("express")
const postController = require("../controllers/post.controllers")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middlewares")


const postRouter = express.Router();
;



/**post Api/ Creating Post */
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

/** Get all Post */
postRouter.get("/",identifyUser,postController.getAllPostController)

/**Details /post/ fetch /user/post  */
postRouter.get("/details/:postId",identifyUser,postController.postDetailsController)

/** post/ likes */
postRouter.post("/likes/:postId",identifyUser,postController.postlikesController)



module.exports = postRouter