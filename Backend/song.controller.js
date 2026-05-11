const songModel = require("../models/song.model")
const id3 = require("node-id3") // require id3 
const storageService = require("../services/storage.service") // require imagekit

const { uploadFile } = require("../services/storage.service")


// upload Songs 
async function uploadSong(req, res) {

    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer) // extract details of song from buffer

    const { mood } = req.body // mood types 

    const normalizedMood = mood.toLowerCase()


    // song and poster file upload on imagekit
    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            fileName: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),

        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            fileName: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])


    // create song 
    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood: normalizedMood  
    })


    // return response 
    res.status(201).json({
        message: "song created successfully",
        song
    })


}


// get Song on basis of mood 
async function getSong(req, res) {
    try {
        const { mood } = req.query;

        if (!mood) {
            return res.status(400).json({
                message: "Mood is required"
            });
        }

        const song = await songModel.findOne({
            mood: { $regex: `^${mood}$`, $options: "i" }
        });

        res.status(200).json({
            message: "song fetched successfully.",
            song,
        });

    } catch (error) {
        console.error("Error fetching song:", error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// get all Songs on basis of mood 
async function getSongsByMood(req, res) {

    try {
        const { mood } = req.query

        // const songs = await songModel.find({
        //     mood 
        // })

        if (!mood) {
            return res.status(400).json({
                message: "Mood is required"
            });
        }

        const songs = await songModel.find({
            mood: { $regex: `^${mood}$`, $options: "i" }
        })

        res.status(200).json({
            message: "songs fetched successfully.",
            songs,
        })
    }
    catch (error) {
        console.error("Error fetching songs:", error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
    
   
}


module.exports = { uploadSong, getSong, getSongsByMood }