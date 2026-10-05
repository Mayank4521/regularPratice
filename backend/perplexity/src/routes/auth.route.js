import { Router } from "express"
import { registerUser,verifyEmail, loginUser, getMe } from "../controllers/auth.controller.js"
import { registerValidator, loginValidator } from "../validator/auth.validator.js"
import { authUser } from "../middleware/auth.middleware.js"

const authRouter = Router()

//@route - /api/auth/register
//@use - to register user
//@access - private
authRouter.post("/register", registerValidator , registerUser)

/**
 * @route - /api/auth/login
 * @use - to login user
 * @access - private
 */
authRouter.post("/login", loginValidator , loginUser)


/**
 * @route - GET /api/auth/get-me
 * @use - to get current logged in user details
 * @access - private
 */
authRouter.get("/get-me",authUser, getMe)


/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 */
authRouter.get("/verify-email", verifyEmail)

export default authRouter