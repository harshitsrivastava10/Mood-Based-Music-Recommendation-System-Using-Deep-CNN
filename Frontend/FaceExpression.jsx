// import { useEffect, useRef, useState } from "react";
// import { detect, init } from "../utils/utils";


// export default function FaceExpression({ onClick = () => { } }) {
//     const videoRef = useRef(null);
//     const landmarkerRef = useRef(null);
//     const streamRef = useRef(null);

//     const [lastMood, setLastMood] = useState(null);
//     const[expression, setExpression] = useState(null);

//     useEffect(() => {
//         init({ landmarkerRef, videoRef, streamRef,  });

//         // Auto-detect mood every 5 seconds
//         const interval = setInterval(async () => {
//             if (videoRef.current && videoRef.current.videoWidth > 0) {
//                 const expression = await detect({ landmarkerRef, videoRef, setExpression });
//                 if (expression && expression !== "Neutral" && expression !== lastMood) {
//                     setLastMood(expression);
//                     onClick(expression);
//                 }
//             }
//         }, 5000);

//         return () => {
//             clearInterval(interval);
//             if (landmarkerRef.current) {
//                 landmarkerRef.current.close();
//             }

//             if (videoRef.current?.srcObject) {
//                 videoRef.current.srcObject
//                     .getTracks()
//                     .forEach((track) => track.stop());
//             }
//         };
//     }, []);

//     async function handleClick() {
//         // check video frame 
//         if(!videoRef.current || videoRef.current.videoWidth === 0) {
//             console.log("Video not ready yet");
//             return ;
//         }

//         const expression = await detect({ landmarkerRef, videoRef, setExpression })
//         console.log(expression)
//         setLastMood(expression);
//         onClick(expression)
//     }

//     async function handleRandomMood() {
//         const moods = ["happy", "surprised", "sad", "neutral"];
//         const randomMood = moods[Math.floor(Math.random() * moods.length)];
//         setExpression(randomMood);
//         setLastMood(randomMood);
//         onClick(randomMood);
//     }


//     return (
//         <div style={{ textAlign: "center" }}>
//             <video
//                 ref={videoRef}
//                 autoPlay
//                 style={{ width: "400px", borderRadius: "12px" }}
//                 playsInline
//             />
//             <h2>{expression}</h2>
//             <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
//                 <button style={{ width: "3rem", paddingInline: "2rem", backgroundColor: "lightseagreen", border: "none" }} onClick={handleClick}>Detect expression</button>
//                 <button style={{ width: "3rem", paddingInline: "2rem", backgroundColor: "orange", border: "none" }} onClick={handleRandomMood}>Random Mood</button>
//             </div>
//         </div>
//     );
// }





import { useEffect, useRef, useState } from "react";
import { detect, detectHandGesture, init } from "../utils/utils";


export default function FaceExpression({ onClick = () => { } }) {

    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);
    const handLandmarkerRef = useRef(null)  ///// add this
    const lastGestureRef = useRef(null);

    // const [lastMood, setLastMood] = useState(null);
    const [expression, setExpression] = useState(null);
    const lastMoodRef = useRef(null); // ✅ FIX: useRef instead of state


    useEffect(() => {
        /// INIT CAMERA + MODEL
        init({ landmarkerRef, handLandmarkerRef, videoRef, streamRef });

        // Auto-detect mood every 5 seconds
        const interval = setInterval(async () => {
            if (!videoRef.current || videoRef.current.videoWidth === 0) return;

            try {
                // face 
                const detected = await detect({
                    landmarkerRef,
                    videoRef,
                    setExpression
                });

                // hand 
                const handData = await detectHandGesture({
                    handLandmarkerRef,
                    videoRef 
                })
                
                // HANDLE HAND CONTROL 

                if(handData && handData.gesture && handData.gesture !== lastGestureRef.current) {
                    lastGestureRef.current = handData.gesture;

                    console.log("Hand:", handData.gesture);

                    onClick({ control: handData.gesture });  // send to player

                    // RESET after 1.5 sec 
                    setTimeout(() => {
                        lastGestureRef.current = null;
                    }, 1500);

                    // Volume 
                }

                // ✅ Avoid duplicate calls
                if (
                    detected &&
                    detected !== "neutral" &&
                    detected !== lastMoodRef.current
                ) {
                    lastMoodRef.current = detected;
                    console.log(detected);
                    onClick({mood: detected}); // 🔥 send to Home.jsx
                }

            } catch (err) {
                console.log("Detection error:", err);
            }

        }, 2000);

        // CLEAN UP
        return () => {
            clearInterval(interval);
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }

            // if (streamRef.current) {
            //     streamRef.current.getTracks().forEach(track => track.stop());
            // }
        };
    }, [onClick]);


    /// Manual DETECT
    async function handleClick() {
        // check video frame 
        if (!videoRef.current || videoRef.current.videoWidth === 0) {
            console.log("Video not ready yet");
            return;
        }

        try {
            const detected = await detect({ landmarkerRef, videoRef, setExpression })

            // check 
            if (
                detected &&
                detected !== "neutral" &&
                detected !== lastMoodRef.current
            ) {
                lastMoodRef.current = detected;
                onClick({mood: detected});
            }
        } catch (err) {
            console.log(err);
        }

    }

    // RANDOM MOOD
    async function handleRandomMood() {
        const moods = ["happy", "surprised", "sad", "neutral"];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];

        setExpression(randomMood);
        lastMoodRef.current = randomMood;
        onClick({mood: randomMood});   // 
    }


    return (
        <div style={{ textAlign: "center" }}>

            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                    width: "400px",
                    borderRadius: "12px",
                    transform: "scaleX(-1)" // ✅ mirror effect
                }}
            />

            <h2>{expression || "Detecting..."}</h2>

            <div style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center"
            }}>
                <button
                    onClick={handleClick}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "lightseagreen",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        width: "100%"
                    }}
                >
                    Detect
                </button>

                <button
                    onClick={handleRandomMood}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "orange",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        width: "100%"
                    }}
                >
                    Random
                </button>
            </div>

        </div>
    );
}












