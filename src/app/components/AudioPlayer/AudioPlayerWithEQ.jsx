"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import styles from "./AudioPlayerWithEQ.module.css";

export default function AudioPlayerWithEQ({ src, title, artist, cover }) {
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const analyserRef = useRef(null);
  const dataRef = useRef(null);
  const rafRef = useRef(null);

  const seekBarRef = useRef(null);
  const dragging = useRef(false);
  const x = useMotionValue(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState(new Array(16).fill(0));
  const [duration, setDuration] = useState(0);

  // ✅ initialize audio + context
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  // prevent duplicate AudioContext creation
  if (!audioCtxRef.current) {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }
  const ctx = audioCtxRef.current;

  // ✅ Only create MediaElementSource once
  if (!sourceRef.current) {
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyserRef.current = analyser;
    dataRef.current = new Uint8Array(analyser.frequencyBinCount);

    sourceRef.current = ctx.createMediaElementSource(audio);
    sourceRef.current.connect(analyser);
    analyser.connect(ctx.destination);
  }

  // visualizer animation
  const animate = () => {
    if (analyserRef.current && dataRef.current) {
      analyserRef.current.getByteFrequencyData(dataRef.current);
      setBars(Array.from(dataRef.current.slice(0, 16)));
    }

    // update seek bar
    const track = seekBarRef.current;
    if (!dragging.current && track && audio.duration) {
      const w = track.offsetWidth || 1;
      const px = (audio.currentTime / audio.duration) * w;
      x.set(px);
    }

    rafRef.current = requestAnimationFrame(animate);
  };
  rafRef.current = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(rafRef.current);
}, [src]);


  // ✅ handle metadata (duration)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const loaded = () => setDuration(audio.duration || 0);
    audio.addEventListener("loadedmetadata", loaded);
    return () => audio.removeEventListener("loadedmetadata", loaded);
  }, [src]);

  // ✅ toggle play
  const togglePlay = async () => {
    const audio = audioRef.current;
    const ctx = audioCtxRef.current;
    if (!audio || !ctx) return;

    try {
      if (ctx.state === "suspended") await ctx.resume();
      audio.muted = false;
      audio.volume = 1;

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Playback failed:", err);
    }
  };

  // ✅ seek logic
  const onDragStart = () => (dragging.current = true);
  const onDragEnd = (_, info) => {
    const audio = audioRef.current;
    const track = seekBarRef.current;
    dragging.current = false;
    if (!audio || !track || !audio.duration) return;

    const w = track.offsetWidth || 1;
    const newTime = (Math.max(0, Math.min(info.point.x, w)) / w) * audio.duration;
    if (isFinite(newTime)) audio.currentTime = newTime;
  };
  const onTrackClick = (e) => {
    const audio = audioRef.current;
    const track = seekBarRef.current;
    if (!audio || !track || !audio.duration) return;

    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const w = rect.width || 1;
    const newTime = (clickX / w) * audio.duration;
    audio.currentTime = newTime;
    x.set(clickX);
  };

  return (
    <div className={styles.playerContainer}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className={styles.coverWrapper}>
        <img
          src={cover || "/assets/img/cartel-cortez-skeleton-hands.png"}
          alt={title}
          className={styles.coverImage}
        />
      </div>

      <div className={styles.infoSection}>
        <div className={styles.trackInfo}>
          <h3>{title || "Unknown Track"}</h3>
          <p>{artist || "Unknown Artist"}</p>
        </div>

        <button onClick={togglePlay} className={styles.playButton}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <div className={styles.equalizer}>
          {bars.map((v, i) => (
            <motion.div
              key={i}
              className={styles.bar}
              animate={{ height: isPlaying ? Math.max(v / 2, 5) : 5 }}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>

        {/* Seek bar */}
        <div className={styles.seekBarWrapper}>
          <motion.div
            ref={seekBarRef}
            className={styles.seekBarTrack}
            onClick={onTrackClick}
          >
            <motion.div className={styles.seekProgress} style={{ width: x }} />
            <motion.div
              className={styles.seekBarThumb}
              drag="x"
              dragConstraints={seekBarRef}
              dragElastic={0}
              style={{ x }}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
