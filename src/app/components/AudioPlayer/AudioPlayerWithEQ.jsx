"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import styles from "./AudioPlayerWithEQ.module.css";

export default function AudioPlayerWithEQ({ src, title, artist, cover }) {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  const [bars, setBars] = useState(new Array(16).fill(0));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // 🎧 Initialize audio context and analyser only once
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const audio = audioRef.current;
    if (audio && !sourceRef.current) {
      const context = audioContextRef.current;
      const source = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();

      analyser.fftSize = 64;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);
      analyser.connect(context.destination);

      sourceRef.current = source;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
    }

    // 🎚️ Animation loop for EQ visualization
    let animationFrameId;
    const animate = () => {
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const freqData = Array.from(dataArrayRef.current.slice(0, 16));
        setBars(freqData);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 🎵 When `src` changes, update and autoplay
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio || !src) return;

  const playAudio = async () => {
    try {
      audio.src = src;
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.warn("Audio playback interrupted:", err);
      }
    }
  };

  playAudio();

  return () => {
    // Stop current playback when changing track
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  };
}, [src]);


  // 🕒 Update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio && audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio?.addEventListener("timeupdate", updateProgress);
    return () => audio?.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={styles.playerContainer}>
      {/* Album Art */}
      <div className={styles.coverWrapper}>
        <img
          src={cover || "/assets/img/default_cover.jpg"}
          alt={title}
          className={styles.coverImage}
        />
      </div>

      {/* Info and Controls */}
      <div className={styles.infoSection}>
        <div className={styles.trackInfo}>
          <h3 className={styles.trackTitle}>{title || "Unknown Track"}</h3>
          <p className={styles.trackArtist}>{artist || "Unknown Artist"}</p>
        </div>

        <div className={styles.controls}>
          <button onClick={togglePlay} className={styles.playButton}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <div className={styles.equalizer}>
            {bars.map((value, i) => (
              <motion.div
                key={i}
                className={styles.bar}
                animate={{ height: isPlaying ? Math.max(value / 2, 5) : 5 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <audio ref={audioRef} preload="auto" />
    </div>
  );
}
