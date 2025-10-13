"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import styles from "./AudioPlayerWithEQ.module.css";

export default function AudioPlayerWithEQ({ src, title, artist, cover }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState(new Array(16).fill(0));
  const [seekX, setSeekX] = useState(0); // thumb position in px
  const [isDragging, setIsDragging] = useState(false);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);
  const seekBarRef = useRef(null);

  // Initialize Audio and AudioContext
  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.crossOrigin = "anonymous";
    audioRef.current.volume = 1;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = ctx;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyserRef.current = analyser;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    sourceRef.current = source;

    // Visualizer
    const animate = () => {
      analyser.getByteFrequencyData(dataArrayRef.current);
      setBars(Array.from(dataArrayRef.current.slice(0, 16)));

      // Update seek bar if not dragging
      if (!isDragging && seekBarRef.current && audioRef.current.duration) {
        const width = seekBarRef.current.offsetWidth;
        const newX = (audioRef.current.currentTime / audioRef.current.duration) * width;
        setSeekX(newX);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      audioRef.current.pause();
      source.disconnect();
      analyser.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
      ctx.close();
    };
  }, [src, isDragging]);

  // Play/pause
  const togglePlay = async () => {
    if (!audioRef.current || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") await ctx.resume();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Playback error:", err);
      }
    }
  };

  // Handle dragging seek bar
  const handleDrag = (event, info) => {
  if (!seekBarRef.current || !audioRef.current || !audioRef.current.duration) return;

  const width = seekBarRef.current.offsetWidth;
  // Clamp x between 0 and track width
  const clampedX = Math.max(0, Math.min(info.point.x, width));
  setSeekX(clampedX);

  // Only set currentTime if audio duration is valid
  if (isFinite(audioRef.current.duration)) {
    const newTime = (clampedX / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  }
};


  return (
    <div className={styles.playerContainer}>
      <div className={styles.coverWrapper}>
        <img
          src={cover || "/assets/img/cartel-cortez-skeleton-hands.png"}
          alt={title}
          className={styles.coverImage}
        />
      </div>

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

        <motion.div
          className={styles.seekBarTrack}
          ref={seekBarRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          <motion.div
            className={styles.seekBarThumb}
            drag="x"
            dragConstraints={seekBarRef}
            dragElastic={0}
            onDrag={handleDrag}
          />
        </motion.div>
      </div>
    </div>
  );
}
