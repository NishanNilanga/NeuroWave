import { useState, useRef } from "react";

import MainScene from "./components/Scene/MainScene";
import AudioUploader from "./components/Audio/AudioUploader";
import AudioAnalyzer from "./components/Audio/AudioAnalyzer";
import HandTracker from "./components/hand/HandTracker";

import {
AudioContextState,
} from "./components/Audio/AudioContext";

function App() {
const audioRef = useRef(null);

const [file, setFile] = useState(null);
const [analyser, setAnalyser] = useState(null);

const [isPlaying, setIsPlaying] =
useState(false);

const [zoomLevel, setZoomLevel] =
useState(8);

const [theme, setTheme] =
useState("ocean");

return (
<AudioContextState.Provider
value={{
isPlaying,
setIsPlaying,

    audioRef,

    zoomLevel,
    setZoomLevel,

    theme,
    setTheme,
  }}
>
  <AudioUploader
    onFileSelect={setFile}
  />

  <AudioAnalyzer
    file={file}
    setAnalyser={setAnalyser}
  />

  <MainScene analyser={analyser} />

  <HandTracker />
</AudioContextState.Provider>

);
}

export default App;