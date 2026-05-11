// import React from 'react'
// import { useSong } from '../hooks/useSong'

// const Sidebar = () => {
//   const { songsList, handleGetSong, song: currentSong } = useSong()

//   const handleSongSelect = (selectedSong) => {
//     handleGetSong(selectedSong)
//   }

//   return (
//     <div style={{
//       width: '300px',
//       height: '100vh',
//       backgroundColor: '#5987b5',
//       padding: '20px',
//       boxSizing: 'border-box',
//       overflowY: 'auto',
//       borderRight: '1px solid #dee2e6'
//     }}>
//       <h3 style={{ marginBottom: '20px', color: '#101113' }}>Songs for your mood</h3>
//       {songsList.length === 0 ? (
//         <p style={{ color: '#131517' }}>No songs available for this mood.</p>
//       ) : (
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {songsList.map((song, index) => (
//             <li key={index} style={{
//               marginBottom: '10px',
//               padding: '10px',
//               backgroundColor: currentSong?.url === song.url ? '#e9ecef' : '#fff',
//               borderRadius: '8px',
//               boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//               cursor: 'pointer',
//               transition: 'background-color 0.2s',
//               border: currentSong?.url === song.url ? '2px solid #007bff' : '1px solid #dee2e6'
//             }} onClick={() => {
//                 handleSongSelect(song)
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <img src={song.posterUrl} alt={song.title} style={{
//                   width: '50px',
//                   height: '50px',
//                   borderRadius: '4px',
//                   marginRight: '10px',
//                   objectFit: 'cover'
//                 }} />
//                 <div>
//                   <strong style={{ display: 'block', marginBottom: '4px', color: '#212529' }}>{song.title}</strong>
//                   <small style={{ color: '#6c757d' }}>Mood: {song.mood}</small>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }

// export default Sidebar






import React from 'react'
import { useSong } from '../hooks/useSong.js'
import "./Sidebar.scss"

const Sidebar = () => {

  const { songsList, handleSelectSong, song: currentSong } = useSong()

  return (
    <div className="sidebar">

      <h2 className="sidebar-title">🎵 Playlist</h2>

      {!songsList || songsList.length === 0 ? (
        <p className="empty">No songs found</p>
      ) : (

        <div className="song-list">

          {songsList.map((song) => (

            <div
              key={song._id}
              onClick={() => handleSelectSong(song)}
              className={`song-card ${currentSong?.url === song.url ? "active" : ""
                }`}
            >

              <img
                src={song.posterUrl}
                alt={song.title}
                className="song-img"
              />

              <div className="song-info">
                <p className="song-title">{song.title}</p>
                <span className="song-mood">{song.mood}</span>
              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  )
}

export default Sidebar