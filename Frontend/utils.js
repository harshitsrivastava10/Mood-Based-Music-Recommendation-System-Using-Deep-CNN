// import {
//     FaceLandmarker,
//     FilesetResolver
// } from "@mediapipe/tasks-vision";

// // set upthe mediapipe initial setup
// export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
//     const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//     );

//     landmarkerRef.current = await FaceLandmarker.createFromOptions(
//         vision,
//         {
//             baseOptions: {
//                 modelAssetPath:
//                     "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
//             },
//             outputFaceBlendshapes: true,
//             runningMode: "VIDEO",
//             numFaces: 1
//         }
//     );

//     streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = streamRef.current;
//     await videoRef.current.play();
// };

// // track the face expressions. 
// export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
//     if (!landmarkerRef.current || !videoRef.current) return;

//     const results = landmarkerRef.current.detectForVideo(
//         videoRef.current,
//         performance.now()
//     );

//     if (results.faceBlendshapes?.length > 0) {
//         const blendshapes = results.faceBlendshapes[ 0 ].categories;

//         const getScore = (name) =>
//             blendshapes.find((b) => b.categoryName === name)?.score || 0;

//         const smileLeft = getScore("mouthSmileLeft");
//         const smileRight = getScore("mouthSmileRight");
//         const jawOpen = getScore("jawOpen");
//         const browUp = getScore("browInnerUp");
//         const frownLeft = getScore("mouthFrownLeft");
//         const frownRight = getScore("mouthFrownRight");

//         console.log(getScore("mouthFrownLeft"))

//         let currentExpression = "Neutral";

//         if (smileLeft > 0.5 && smileRight > 0.5) {
//             currentExpression = "happy";
//         } else if (jawOpen > 0.2 && browUp > 0.2) {
//             currentExpression = "surprised";
//         } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
//             currentExpression = "sad";
//         }

//         setExpression(currentExpression);

//         return currentExpression
//     }
// };






import {
    FaceLandmarker,
    FilesetResolver,
    HandLandmarker    // ADD THIS
} from "@mediapipe/tasks-vision";

// 🔥 INIT MEDIAPIPE
export const init = async ({ landmarkerRef, videoRef, streamRef, handLandmarkerRef }) => {
    try {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        /// FACE DETECTION
        landmarkerRef.current = await FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
                },
                outputFaceBlendshapes: true,
                runningMode: "VIDEO",
                numFaces: 1
            }
        );

        // HAND DETECTION 
        handLandmarkerRef.current = await HandLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath: 
                            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task"
                },
                runningMode: "VIDEO",
                numHands: 1
            }
        )

        // 🎥 Start camera
        streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        videoRef.current.srcObject = streamRef.current;
        await videoRef.current.play();

    } catch (err) {
        console.error("Init error:", err);
    }
};


// 🔍 DETECT EXPRESSION
export const detect = async ({ landmarkerRef, videoRef, setExpression }) => {

    if (!landmarkerRef.current || !videoRef.current) return null;

    try {
        const results = landmarkerRef.current.detectForVideo(
            videoRef.current,
            performance.now()
        );

        if (!results.faceBlendshapes?.length) return null;

        const blendshapes = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        // 😊 HAPPY
        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");

        // 😲 SURPRISED
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");

        // 😢 SAD
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        // 😤 ANGRY (NEW 🔥)
        const browDownLeft = getScore("browDownLeft");
        const browDownRight = getScore("browDownRight");
        const noseSneerLeft = getScore("noseSneerLeft");
        const noseSneerRight = getScore("noseSneerRight");
        const mouthPressLeft = getScore("mouthPressLeft");
        const mouthPressRight = getScore("mouthPressRight");

        const angryScore =
            (browDownLeft + browDownRight) / 2 +
            (noseSneerLeft + noseSneerRight) / 2 +
            (mouthPressLeft + mouthPressRight) / 2;

        let currentExpression = "neutral";

        // 🔥 PRIORITY ORDER (important)
        if (smileLeft > 0.5 && smileRight > 0.5) {
            currentExpression = "happy";
        } else if (jawOpen > 0.2 && browUp > 0.2) {
            currentExpression = "surprised";
        } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
            currentExpression = "sad";
        }

        setExpression(currentExpression);
        
        return currentExpression;

    } catch (err) {
        console.error("Detection error:", err);
        return null;
    }
};


// DETECT HAND GESTURE
export const detectHandGesture = async ({
    handLandmarkerRef,
    videoRef
}) => {
    if(!handLandmarkerRef.current || !videoRef.current) return null;

    const results = handLandmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if(!results.landmarks?.length) return null;

    const landmarks = results.landmarks[0];

    // Basic finger Detection 
    const thumb = landmarks[4];
    const index = landmarks[8];
    const middle = landmarks[12];
    const ring = landmarks[16];
    const pinky = landmarks[20];
    const wrist = landmarks[0];

    // simple gesture logic 
    const isFist = 
        index.y > wrist.y &&
        middle.y > wrist.y &&
        ring.y > wrist.y && 
        pinky.y > wrist.y;

    const isOpenPalm = 
        index.y < wrist.y &&
        middle.y < wrist.y &&
        ring.y < wrist.y && 
        pinky.y < wrist.y;

    const isThumb = thumb.y < wrist.y;
    const isThumbDown = thumb.y > wrist.y;

  
    let detectedGesture = null; 
  

    // if(isOpenPalm) return "play";
    // if(isFist) return "pause";
    // if(isThumb) return "next";
    // if(isThumbDown) return "previous";

    if(isOpenPalm) detectedGesture = "play";
    else if(isFist) detectedGesture = "pause";
    else if(isThumb) detectedGesture = "next";
    else if(isThumbDown) detectedGesture = "previous";

      /// distance based volume
    const distance = Math.sqrt(
        Math.pow(thumb.x - index.x, 2) + Math.pow(thumb.y - index.y, 2)
    )

    return {
        gesture: detectedGesture,
        volume: distance 
    };


    // return null;
}