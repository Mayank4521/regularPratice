const express = require("express")
const authRouter = express.Router()
const identifyUser = require("../middleware/auth.middleware")
const {registerController,loginController,getMeController,logoutController }= require("../controller/auth.controller")

// @Route POST - /api/auth/register
// @description - register a user
// @access - public
authRouter.post("/register",registerController)

// @roure POST - /api/auth/login
// @description - login a user
// @access - public
authRouter.post("/login",loginController)

// @route GET - /api/auth/get-me
// @description - get the current user details
// @access - private
authRouter.get("/get-me",identifyUser,getMeController)

// @route POST - /api/auth/logout
// @description - logout a user
// @access - private
authRouter.post("/logout",identifyUser,logoutController)

module.exports = authRouter