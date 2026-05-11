const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url: {
        type: String, 
        required: true
    },
    posterUrl: {
        type: String,
        required: true 
    },
    title: {
        type: String,
        required: true 
    },
    mood: {
        type: String, 
        enum: {
            values: ["happy", "sad", "surprised", "angry", "neutral"],
            message: "Mood must be happy, sad, surprised, angry, or neutral"
        }
    }
})


const songModel = mongoose.model("songs", songSchema)

module.exports = songModel