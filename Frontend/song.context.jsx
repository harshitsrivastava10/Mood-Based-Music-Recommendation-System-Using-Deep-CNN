// /// state layer for song 

// import { createContext } from "react";
// import { useState } from "react";


// export const SongContext = createContext();

// export const SongContextProvider = ({ children }) => {

//     // use state 
//     const [song, setSong] = useState({
//         "url": "https://ik.imagekit.io/72eziopbl/cohort-2/moodify/songs/Chumma__From__Vicky_Vidya_Ka_Woh_Wala_Video____DownloadMing.WS__QEMqqsVeC.mp3",
//         "posterUrl": "https://ik.imagekit.io/72eziopbl/cohort-2/moodify/posters/Chumma__From__Vicky_Vidya_Ka_Woh_Wala_Video____DownloadMing.WS__M5-Ot98gX.jpeg",
//         "title": "Chumma (From \"Vicky Vidya Ka Woh Wala Video\") [DownloadMing.WS]",
//         "mood": "surprised",
//     }
//     )



//     // loading
//     const [loading, setLoading] = useState(false);

//     // songs list for sidebar
//     const [songsList, setSongsList] = useState([]);

//     // function to select a song
//     const selectSong = (selectedSong) => {
//         console.log("Song selected:", selectedSong.title)
//         setSong(selectedSong);
//         console.log(song.url);
//     };


//     const playRandomSong = () => {
//         if(songsList.length === 0) return ;

//         const randomIndex = Math.floor(Math.random() * songsList.length);
//         setSong(songsList[randomIndex]);
//     };

//     return (
//         <SongContext.Provider
//             value={{ loading, setLoading, song, setSong, songsList, setSongsList, selectSong, playRandomSong }}
//         >
//             {children}

//         </SongContext.Provider>
//     )
// } 




import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState(null);
    const [songsList, setSongsList] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ GET SONGS BY MOOD (MongoDB)
    const getSongsByMood = async (mood) => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/songs?mood=${mood}`);
            const data = await res.json();

            setSongsList(data);

            // auto select first song
            if (data.length > 0) {
                setSong(data[0]);
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ SELECT SONG
    const selectSong = (selectedSong) => {
        setSong(selectedSong);
    };

    return (
        <SongContext.Provider
            value={{
                song,
                songsList,
                loading,
                setLoading,
                getSongsByMood,
                selectSong,
                setSongsList,
                setSong
            }}
        >
            {children}
        </SongContext.Provider>
    );
};