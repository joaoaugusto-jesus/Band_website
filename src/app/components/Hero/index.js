"use client";

import { useState, useRef } from "react";
import LayoutBg from "../LayoutBg/page";
import styles from "./Hero.module.css";
import Button from "../Button";
import Subscribe from '../Subscribe';
import PageIcon from '../Icons/page';

export default function Hero() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const tracks = [
    {
      name: "Perpetual Blues Machine",
      src: "/assets/musics/perpetual.mp3",
    },
    {
      name: "Baby Tonight",
      src: "/assets/musics/baby tonight.mp3",
    },
  ];

  const videos = [
    {
      name: "Live at Fandangos",
      src: "/assets/vid/snazzy live at fandango.mp4",
    },
    {
      name: "Lonely Wolf Clip",
      src: "/assets/vid/lonely wolf videoclip.mp4",
    },
  ];

  const playTrack = (track) => {
    if (videoRef.current) {
      videoRef.current.pause();
      setCurrentVideo(null);
      setIsPlaying(false);
    }

    if (audioRef.current && currentTrack?.name === track.name) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      return;
    }

    setCurrentTrack(track);
    setIsPlaying(true);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
      }
    }, 0);
  };

  const playVideo = (video) => {
    if (audioRef.current) {
      audioRef.current.pause();
      setCurrentTrack(null);
      setIsPlaying(false);
    }

    if (videoRef.current && currentVideo?.name === video.name) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      return;
    }

    setCurrentVideo(video);
    setIsPlaying(true);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }, 0);
  };

  return (
    <div className={styles.layout}>
      <LayoutBg />
      <section className={styles.sectionHeader}>
        <h1>The Snazzy Ragamuffins</h1>
        <p>Rock´n Roll Covers and Original Songs</p>
      </section>
      <section className={styles.sectionMedia}>
        <ul className="list-musics">
          {tracks.map((track, index) => (
            <li key={index} className={styles.listMusicsItems}>
              <Button
                className={`${styles.musicButton} ${currentTrack?.name === track.name && isPlaying ? styles.active : ''}`}
                onClick={() => playTrack(track)}
              >
                {track.name}
              </Button>
            </li>
          ))}
        </ul>

        {currentTrack && (
          <div className={styles.audioContainer}>
            <h3>Now Playing: {currentTrack?.name}</h3>
            <audio
              ref={audioRef}
              controls
              autoPlay
              className={styles.audioPlayer}
              onEnded={() => {
                setCurrentTrack(null);
                setIsPlaying(false);
              }}
            >
              <source src={currentTrack?.src} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <ul className="list-videos">
          {videos.map((video, index) => (
            <li key={index} className={styles.listVideoItems}>
              <Button
                className={`${styles.videoButton} ${currentVideo?.name === video.name && isPlaying ? styles.active : ''}`}
                onClick={() => playVideo(video)}
              >
                {video.name}
              </Button>
            </li>
          ))}
        </ul>

        {currentVideo && (
          <div className={styles.videoContainer}>
            <h3>Now Playing: {currentVideo?.name}</h3>
            <video
              ref={videoRef}
              controls
              autoPlay
              className={styles.videoPlayer}
              onEnded={() => {
                setCurrentVideo(null);
                setIsPlaying(false);
              }}
            >
              <source src={currentVideo?.src} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
        )}
        
        <Subscribe />
      </section>
     
      <PageIcon />
    </div>
  );
}
