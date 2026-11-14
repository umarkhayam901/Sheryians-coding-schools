const express = require('express');
const authRouter  = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")


const app = express();


app.use(express.json());
app.use("/auth/api",authRouter );
app.use(cookieParser());


module.exports = app