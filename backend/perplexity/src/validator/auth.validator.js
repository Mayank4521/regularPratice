import { body, validationResult } from "express-validator"

export const validate = (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next()
    }

export const registerValidator= [
    body("username")
        .isString().withMessage("Username must be a string")
        .bail()
        .trim()
        .notEmpty().withMessage("Username is required"),
    body("email")
        .isString().withMessage("Email must be a string")
        .bail()
        .trim()
        .isEmail().withMessage("A valid email is required")
        .normalizeEmail(),
    body("password")
        .isString().withMessage("Password must be a string")
        .bail()
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    validate
]


export const loginValidator= [
    body("email")
        .trim()
        .isEmail().withMessage("A valid email is required")
        .notEmpty().withMessage("Email is required"),
    body("password")
        .isString().withMessage("Password must be a string")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    validate]