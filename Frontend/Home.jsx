// import React from 'react'
// import FaceExpression from "../../Expression/components/FaceExpression"
// import Player from '../components/Player'
// import Sidebar from '../components/Sidebar'
// import { useSong } from '../hooks/useSong'

// const Home = () => {

//   const {handleGetSong, handleGetSongsByMood} = useSong()

//   const handleMoodChange = (expression) => {
//     handleGetSong({mood: expression})
//     handleGetSongsByMood({mood: expression})
//   }

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//         <Sidebar />
//         <div style={{ 
//           flex: 1, 
//           display: 'flex', 
//           flexDirection: 'column', 
//           alignItems: 'center', 
//           justifyContent: 'center',
//           padding: '20px',
//           boxSizing: 'border-box'
//         }}>
//             <FaceExpression onClick={handleMoodChange} />
//             <Player />
//         </div>
//     </div>
//   )
// }

// export default Home





import React, { useState } from 'react'
import FaceExpression from "../../Expression/components/FaceExpression"
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'
import { useSong } from '../hooks/useSong.js'
import "./Home.scss"
import { useCallback } from 'react'


const Home = () => {

  const { handleGetSongsByMood, loading, song } = useSong()

  const [control, setControl] = useState(null);  // song controls

  const [volume, setVolume] = useState(1);

  // const handleMoodChange = useCallback((expression) => {
  //   console.log("Detected mood:", expression)
  //   handleGetSongsByMood({ mood: expression})  // wrap here
  // }, []);

  const handleAIAction = useCallback((data) => {
    console.log("AI Data:", data)

    // modd detection 
    if(data?.mood) {
      handleGetSongsByMood({ mood: data.mood})  // wrap here
    }

    if(data?.volume !== undefined) {
      setVolume(data.volume);
    }

    // Gesture control 
    if(data?.control) {
      setControl(data.control);
      // switch(data.control) {
      //   case "play": 
      //     document.querySelector("audio")?.play();
      //     break;
        
      //    case "pause": 
      //     document.querySelector("audio")?.pause();
      //     break;
        
      //    case "next": 
      //     console.log("Next Song");
      //     // call your nextSong()
      //     break;
        
      //    case "previous": 
      //     // call for prevSong()
      //     break;
        
      //   default: 
      //     break;
        
      
    }
    
  }, [handleGetSongsByMood]);

  return (
    <div className="home-page">

      {/* Sidebar */}
      <div className="home-sidebar">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="home-main">

        {/* Header */}
        <div className="home-header">
          <h1>🎧 MoodTunes</h1>

          {song && (
            <div className="mood-badge">
              Mood: {song.mood}
            </div>
          )}
        </div>

        {/* Face Detection */}
        <div className="home-face">
          <FaceExpression onClick={handleAIAction} />
        </div>

        {/* Loading */}
        {loading && <p className="loading">Fetching songs...</p>}

        {/* Player */}
        <div className="home-player">
          <Player control = {control} volumeGesture={volume}/>
        </div>

      </div>

    </div>
  )
}

export default Home