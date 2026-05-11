const express = require("express")
const authController = require("../controller/auth.controller")

const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = express.Router()

// apis
authRouter.post("/register", authController.registerController)

authRouter.post("/login", authController.loginController)

// identify the request of user by token [token blacklisting]
authRouter.get("/get-me", authMiddleware, authController.getMe)

authRouter.get("/logout", authController.logoutController)


module.exports = authRouter 