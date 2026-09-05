const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

//register POST - /api/auth/register
authRouter.post("/register",authController.registerUser)

//login POST - /api/auth/login
authRouter.post("/login",authController.loginUser)

//get-me GET - /api/auth/get-me
authRouter.get("/get-me",authMiddleware.authUser,authController.getMe)

//logout GET -/api/auth/logout
authRouter.get("/logout",authController.logoutUser)

module.exports = authRouter