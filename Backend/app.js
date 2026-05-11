const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const songRouter = require("./routes/song.routes")

const cors = require("cors")

// middlewares 
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "https://moodify-music-recommendation.vercel.app",
    credentials: true
}))


app.use("/api/auth", authRouter)
app.use("/api/songs", songRouter)


app.get('/ping', (req, res) => {
  res.send('pong');
});

module.exports = app 