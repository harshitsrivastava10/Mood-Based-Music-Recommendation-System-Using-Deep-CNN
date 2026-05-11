const express = require("express")

const router = express.Router()

// import upload milldeware 
const upload = require("../middlewares/upload.middleware")

// import songcontroller 
const songController = require("../controller/song.controller")


// api call 
/**
 * POST /api/songs/
 */
router.post("/", upload.single("song"), songController.uploadSong)

router.get("/", songController.getSong)

router.get("/mood", songController.getSongsByMood)

module.exports = router