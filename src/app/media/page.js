"use client";

import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import LayoutBg from "../components/LayoutBg/page";
import Button from "../components/Button"; 
import styles from "./Media.module.css";
import PageIcon from "../components/Icons/page";
import { useState, useRef } from "react";
export default function Media() {

      const [currentTrack, setCurrentTrack] = useState(null);
      const [currentVideo, setCurrentVideo] = useState(null);
      const [isPlaying, setIsPlaying] = useState(false);
    
      const audioRef = useRef(null);
      const videoRef = useRef(null);
    
      const tracks = [
        {
          name: "Perpetual Blues Machine",
          src: 'assets/musics/perpetual.mp3', 
        },
        {
          name: "Baby Tonight",
          src: "assets/musics/baby tonight.mp3",
        },
      ];
    
      const videos = [
        {
          name: "Live at Fandangos",
          src: "assets/vid/snazzy live at fandango.mp4",
        },
        {
          name: "Lonely Wolf",
          src: "assets/vid/lonely wolf videoclip.mp4",
        },
        {
          name: "Surfer Girl",
          src: "assets/vid/Surfer Girl Video Clip.mp4",
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
        <>
        <Navbar />
        
            <LayoutBg />
           
          <section className={styles.sectionMedia}>
        <ul className="list-musics">
            <h2 className={styles.subtitle}>Musics</h2>  
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
          <h2 className={styles.subtitle}>Videos</h2>
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
      
      </section> 
        <PageIcon />
        <Footer />
        </>
    );
}