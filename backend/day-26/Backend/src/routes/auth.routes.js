const express = require("express")
const authRouter  = express.Router()
const authController = require("../controller/auth.controller")

//@Route- POST -/api/auth/register
//@description - to register user
//@access -private
authRouter.post("/register",authController.registerController)

//@Route- POST -/api/auth/login
//@description - to login user
//@access -private
authRouter.post("/login",authController.loginController)

module.exports = authRouter