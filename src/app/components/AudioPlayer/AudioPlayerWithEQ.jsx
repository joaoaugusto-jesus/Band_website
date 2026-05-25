"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import styles from "./AudioPlayerWithEQ.module.css";

export default function AudioPlayerWithEQ({ src, title, artist, cover }) {
  const audioRef = useRef(null);
  const seekRef = useRef(null);

  const dragging = useRef(false);
  const dragX = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ---------------- SYNC AUDIO TIME ---------------- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      if (!dragging.current) {
        setProgress(audio.currentTime / audio.duration || 0);
      }
    };

    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, []);

  /* ---------------- PLAY / PAUSE ---------------- */
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await audio.play();
      setIsPlaying(true);
    }
  };

  /* ---------------- SEEK CORE ---------------- */
  const seekTo = (clientX) => {
    const audio = audioRef.current;
    const track = seekRef.current;
    if (!audio || !track) return;

    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));

    const percent = x / rect.width;

    audio.currentTime = percent * audio.duration;
    setProgress(percent);
  };

  /* ---------------- CLICK SEEK ---------------- */
  const onClick = (e) => {
    seekTo(e.clientX);
  };

  /* ---------------- DRAG START ---------------- */
  const onDragStart = () => {
    dragging.current = true;
  };

  /* ---------------- DRAG MOVE (LIVE UPDATE) ---------------- */
  const onDrag = (_, info) => {
    const track = seekRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const x = info.point.x - rect.left;

    const percent = Math.max(0, Math.min(1, x / rect.width));

    dragX.current = percent;
    setProgress(percent);

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = percent * audio.duration;
    }
  };

  /* ---------------- DRAG END ---------------- */
  const onDragEnd = () => {
    dragging.current = false;
  };

  return (
    <div className={styles.playerContainer}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className={styles.infoSection}>
        <img
          src={cover || "/assets/img/cartel-cortez-skeleton-hands.png"}
          alt={title || "Cover"}
          className={styles.coverImage}
        />

        <h3>{title}</h3>
        <p>{artist}</p>

        {/* SEEK BAR */}
        <div
          ref={seekRef}
          className={styles.seekBarTrack}
          onClick={onClick}
        >
          {/* progress fill */}
          <div
            className={styles.seekProgress}
            style={{ width: `${progress * 100}%` }}
          />

          {/* thumb */}
          <motion.div
            className={styles.seekBarThumb}
            style={{ left: `${progress * 100}%` }}
            drag="x"
            dragConstraints={seekRef}
            dragElastic={0}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
          />
        </div>

        {/* PLAY BUTTON */}
        <button onClick={togglePlay} className={styles.playButton}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
}