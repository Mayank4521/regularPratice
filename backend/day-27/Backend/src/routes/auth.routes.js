const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

//register
authRouter.post("/register",authController.registerController)


//login
authRouter.post("/login",authController.loginController)

//get-me
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

//logout
authRouter.get("/logout",authController.logoutController)

module.exports = authRouter