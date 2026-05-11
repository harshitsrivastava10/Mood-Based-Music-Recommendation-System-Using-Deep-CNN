const jwt = require("jsonwebtoken")
const userModel = require("../models/auth")

// redis 
const redis = require("../config/cache")

async function authUser(req, res, next) {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    // check token in blacklist using REDIS 
    const isTokenBlacklist = await redis.get(token)

    if(isTokenBlacklist){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // create new user property
        req.user = decoded

        next() // forward request to next controller
    }
    catch(err) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

}

module.exports = authUser