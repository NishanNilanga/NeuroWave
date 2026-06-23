import { useEffect, useRef, useState, useContext } from "react";

import {
FilesetResolver,
HandLandmarker,
} from "@mediapipe/tasks-vision";

import {
AudioContextState,
} from "../Audio/AudioContext";

export default function HandTracker() {
const videoRef = useRef();

const {
setIsPlaying,
audioRef,
setZoomLevel,
theme,
setTheme,
} = useContext(AudioContextState);

const [status, setStatus] =
useState("📷 Camera Starting...");

useEffect(() => {
async function setupCamera() {
try {
const stream =
await navigator.mediaDevices.getUserMedia({
video: true,
});

    videoRef.current.srcObject = stream;

    setStatus("📷 Camera Active");
  } catch (err) {
    console.error(err);
    setStatus("❌ Camera Error");
  }
}

async function startHandTracking() {
  const vision =
    await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

  const handLandmarker =
    await HandLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        },

        runningMode: "VIDEO",
        numHands: 1,
      }
    );

  const detect = () => {
    if (
      !videoRef.current ||
      videoRef.current.readyState < 2
    ) {
      requestAnimationFrame(detect);
      return;
    }

    const results =
      handLandmarker.detectForVideo(
        videoRef.current,
        performance.now()
      );

    if (
      results.landmarks &&
      results.landmarks.length > 0
    ) {
      const hand =
        results.landmarks[0];

      const wristX = hand[0].x;
      const indexX = hand[8].x;

      const indexUp =
        hand[8].y < hand[6].y;

      const middleUp =
        hand[12].y < hand[10].y;

      const ringUp =
        hand[16].y < hand[14].y;

      const pinkyUp =
        hand[20].y < hand[18].y;

      const openFingers =
        (indexUp ? 1 : 0) +
        (middleUp ? 1 : 0) +
        (ringUp ? 1 : 0) +
        (pinkyUp ? 1 : 0);

      const twoFingers =
        indexUp &&
        middleUp &&
        !ringUp &&
        !pinkyUp;

      const swipeRight =
        indexX - wristX > 0.25;

      const swipeLeft =
        wristX - indexX > 0.25;

      /* ☝️ ONE FINGER = ZOOM IN */
      if (
        indexUp &&
        !middleUp &&
        !ringUp &&
        !pinkyUp
      ) {
        setStatus("☝️ Zoom In");

        setZoomLevel((prev) =>
          Math.max(3, prev - 0.1)
        );
      }

      /* ✌️ TWO FINGERS = ZOOM OUT */
      else if (twoFingers) {

        setStatus("✌️ Zoom Out");

        setZoomLevel((prev) =>
          Math.min(12, prev + 0.1)
        );
      }

      /* ✋ OPEN PALM = PLAY */
      else if (openFingers >= 3) {

        setStatus("✋ Open Palm");

        if (
          audioRef.current &&
          audioRef.current.paused
        ) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }

      /* 👉 FIRE THEME */
      else if (swipeRight) {

        setStatus("👉 Fire Theme");

        if (theme !== "fire") {
          setTheme("fire");
        }
      }

      /* 👈 OCEAN THEME */
      else if (swipeLeft) {

        setStatus("👈 Ocean Theme");

        if (theme !== "ocean") {
          setTheme("ocean");
        }
      }

      /* ✊ FIST = PAUSE */
      else {

        setStatus("✊ Fist");

        if (
          audioRef.current &&
          !audioRef.current.paused
        ) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }

    } else {
      setStatus("🙌 No Hand Detected");
    }

    requestAnimationFrame(detect);
  };

  detect();
}

async function init() {
  await setupCamera();
  await startHandTracking();
}

init();

}, []);

return (
<>
<div className="camera-panel">
<div className="hand-status">
{status}
</div>

    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="webcam"
    />
  </div>
</>

);
}