const express = require("express");
const authRouter = require("./routes/auth.routes");
const songRouter = require("./routes/song.routes")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path")

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({}),
);
app.use("/api/auth", authRouter);
app.use("/api/songs",songRouter)
app.use(express.static("./public"))
app.use("*name",(req,res)=>{
  res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

module.exports = app;
