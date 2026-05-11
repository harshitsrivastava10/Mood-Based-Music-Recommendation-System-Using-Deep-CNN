const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: [true, "Username is unique"],
        required: [true, "Username is required"]
    },
    email: {
        type: String, 
        unique: [true, "Email is unique"],
        required: [true, "Email is required"]
    },
    password: {
        type: String, 
        required: [true, "password is required"],
        select: false  // hide pass
    }
}, {timestamps: true});


const userModel = mongoose.model("moodify", userSchema)

module.exports = userModel