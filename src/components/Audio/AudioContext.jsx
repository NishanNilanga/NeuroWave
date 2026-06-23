import { createContext } from "react";

export const AudioContextState =
createContext({
isPlaying: false,
setIsPlaying: () => {},

audioRef: null,

zoomLevel: 8,
setZoomLevel: () => {},

theme: "ocean",
setTheme: () => {},

});