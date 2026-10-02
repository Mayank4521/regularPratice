import { Router } from "express"
import { registerUser } from "../controllers/auth.controller.js"
import { authValidator } from "../validator/auth.validator.js"

const authRouter = Router()

//@route - /api/auth/register
//@use - to register user
//@access - private
authRouter.post("/register", authValidator , registerUser)

export default authRouter