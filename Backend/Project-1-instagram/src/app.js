const express = require('express');
const cookieParser = require("cookie-parser")





/**Routers */
const authRouter = require('../src/routes/auth.routes')
const postRouter = require('../src/routes/post.routes')
const userFollowRouter = require("../src/routes/follow.routes")




const app = express();



app.use(express.json());
app.use(cookieParser());


/**calling router/middleware */
app.use("/api/auth", authRouter);
app.use("/api/post",postRouter)
app.use("/api/user",userFollowRouter)





module.exports = app;