const express = require("express")
const authRouter = express.Router()
const authController = require("../controller/auth.controller")
const authUser = require("../middlewares/auth.middleware")

// POST - api/auth/register
authRouter.post("/register", authController.registerController)

//POST - api/auth/login
authRouter.post("/login", authController.loginController)

//GET - api/auth/getMe
authRouter.get("/get-me",authUser, authController.getMeController)

//GET - api/auth/logout
authRouter.get("/logout",authUser, authController.logoutController)

module.exports = authRouter