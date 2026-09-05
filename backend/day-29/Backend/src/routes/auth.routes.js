const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

//routes

authRouter.post("/register",authController.registerUser)

authRouter.post("/login",authController.loginUser)

authRouter.get("/get-me",authMiddleware.authUser,authController.getMe)

authRouter.get("/logout",authController.logoutUser)

module.exports = authRouter