import {
  useEffect,
  useContext,
} from "react";

import {
  AudioContextState,
} from "./AudioContext";

export default function AudioAnalyzer({
  file,
  setAnalyser,
}) {
  const { audioRef } =
    useContext(AudioContextState);

  useEffect(() => {
    if (!file) return;

    audioRef.current = new Audio(
      URL.createObjectURL(file)
    );

    const audio =
      audioRef.current;

    audio.play();

    const ctx =
      new (window.AudioContext ||
        window.webkitAudioContext)();

    const source =
      ctx.createMediaElementSource(audio);

    const analyser =
      ctx.createAnalyser();

    analyser.fftSize = 256;

    source.connect(analyser);

    analyser.connect(ctx.destination);

    setAnalyser(analyser);

    return () => {
      audio.pause();
    };
  }, [file]);

  return null;
}