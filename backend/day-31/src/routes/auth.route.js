import {Router} from "express"
import { registerUser } from "../controllers/auth.controller.js"
import registerValidator from "../validation/registerValidator.js"

const authRouter = Router()

authRouter.post("/register", registerValidator, registerUser)

export default authRouter