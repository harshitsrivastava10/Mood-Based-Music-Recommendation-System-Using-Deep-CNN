const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../models/auth")
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")

async function registerController(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            {
                username
            },
            {
                email
            }
        ]
    }

    )

    if (isAlreadyRegistered) {
        return res.status(400).json({
            message: "Users with the same email or username already registered"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, email, password: hashPassword
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })

    return res.status(201).json({
        message: "User Registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginController(req, res) {
    const { email, password } = req.body;

  

    console.log(email, password)

    // 2️⃣ Find user with username OR email
    const isUser = await userModel.findOne({
        $or: [
            email ? { email } : null
        ].filter(Boolean)  // remove null values
    }).select("+password") // add password 

    if (!isUser) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

     // 3️⃣ Compare password
    const isPasswordValid = await bcrypt.compare(password, isUser.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }


    // 4️⃣ Generate JWT token
    const token = jwt.sign({
        id: isUser._id,
        email: isUser.email,
        // username: isUser.username
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    )

      // 5️⃣ Send cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })

     // 6️⃣ Success response
    return res.status(200).json({
        message: "User Login successfully",
        user: {
            id: isUser._id,
            // username: isUser.username,
            email: isUser.email
        }
    })
}

async function getMe(req, res) { // get the user data using if valid token
    // hide pass -> .select("-password")
    const user = await userModel.findById(req.user.id)
    console.log("user:", user);

    res.status(200).json({
        message: "user fetched successfully",
        user
    })

}

async function logoutController(req, res) {
    const token = req.cookies.token

    res.clearCookie("token") // clear token on client side

    // await blacklistModel.create({  // add or create the token in blacklist 
    //     token 
    // })


    // redis me store krna token ko
    /**
     * key-value pair me store
     * js object 
     */
    redis.set(token, String(Date.now()), "EX", 60 * 60);  // 1hr expire token

    return res.status(200).json({
        message: "logout successfully"
    })
}

module.exports = {
    registerController,
    loginController,
    getMe,
    logoutController
}