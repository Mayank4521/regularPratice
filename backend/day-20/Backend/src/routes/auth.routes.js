const express = require("express")
const authController = require("../controller/auth.controller")
const indentifyUser = require("../middlewares/auth.middleware");

const authRouter = express.Router()

//POST - /api/auth/register
//register user
authRouter.post("/register",authController.registerController)

//POST - /api/auth/login
//login user
authRouter.post("/login",authController.loginController)

//GET - /api/auth/get-me
//get user details
authRouter.get("/get-me",indentifyUser,authController.getMeController)


module.exports = authRouter