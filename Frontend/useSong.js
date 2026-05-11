// import { useContext } from "react";
// import { SongContext } from "../song.context";
// import { getSong, getSongsByMood } from "../service/song.api";


// export const useSong = () => {

//     // create context and get states of song 
//     const context =  useContext(SongContext)

//     const { loading, setLoading, song, setSong, songsList, setSongsList } = context 


//     // handle get song function 
//     async function handleGetSong({ mood }) {
//         setLoading(true)
//         const data = await getSong({mood}); // get data of song 
//         setSong(data.song)
//         setLoading(false)
//     } 

//     // handle get songs by mood for sidebar
//     async function handleGetSongsByMood({ mood }) {
//         const data = await getSongsByMood({mood});
//         setSongsList(data.songs)
//     }


//     return ({ loading, song, handleGetSong, songsList, handleGetSongsByMood })
// }





import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSongsByMood } from "../service/song.api.js";

export const useSong = () => {

    const context = useContext(SongContext);
    

    const {
        loading,
        setLoading,
        song,
        setSong,
        songsList,
        setSongsList
    } = context;

    // 🔥 FETCH SONGS BY MOOD (MAIN API)
    async function handleGetSongsByMood({ mood }) {
        try {
            setLoading(true);

            // const mood = typeof input === "string" ? input : input?.mood;

            console.log("Fetching songs for mood:", mood); // ✅ debug


            if (!mood) {
                console.warn("Mood is undefined!");
                return;
            }

            const data = await getSongsByMood({ mood });


            // ✅ safe extraction
            // const songs = data?.songs || [];
            const songs = Array.isArray(data) ? data : data?.songs || [];

            console.log("Songs received:", songs); // ✅ debug

            //// SHUFFLE FUNCTION 
            const shuffleArray = (array) => {
                // return array.sort(() => Math.random() - 0.5);   ///
                return [...array].sort(() => Math.random() - 0.5);
            }

            // shuffle songs 
            const shuffledSongs = shuffleArray([...songs]);

            setSongsList(shuffledSongs);

            // ✅ auto select first song
            if (shuffledSongs.length > 0) {
                setSong(shuffledSongs[0]);
            } else {
                setSong(null); // ✅ reset player if empty
            }

        } catch (err) {
            console.error("Error fetching songs:", err);

            // ❗ fallback
            setSongsList([]);
            setSong(null);

        } finally {
            setLoading(false);
        }
    }

    // 🎵 SELECT SONG (NO API CALL)
    function handleSelectSong(selectedSong) {
        if (!selectedSong) return;

        console.log("Selected song:", selectedSong.title); // ✅ debug
        setSong(selectedSong);
    }

    return {
        loading,
        song,
        songsList,
        handleGetSongsByMood,
        handleSelectSong
    };
};