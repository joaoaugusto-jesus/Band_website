"use client";

import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import Button from "../components/Button";
import styles from "./Media.module.css";
import PageIcon from "../components/Icons/page";
import { useState, useRef } from "react";
import { tracks } from "../Data/music-tracks";
import { videos } from "../Data/music-videos";

export default function Media() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [mediaType, setMediaType] = useState("music"); // State to track selected media type
  
  
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
    setSelectedVideo(null); // Stop video if playing
    if (audioRef.current) {
      audioRef.current.src = track.src;
      audioRef.current.play();
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setSelectedTrack(null); // Stop audio if playing
    if (videoRef.current) {
      videoRef.current.src = video.src;
      videoRef.current.play();
    }
  };

  const handleMediaTypeChange = (event) => {
    setMediaType(event.target.value); // Update media type based on dropdown selection
    setSelectedTrack(null); // Reset selected track
    setSelectedVideo(null); // Reset selected video
  };

  return (
    <>
      <Navbar />
      <div className={styles.mediaContainer}>
        <h1 className={styles.title}>Media Gallery</h1>

        {/* Dropdown Selector */}
        <div className={styles.dropdownContainer}>
          <label htmlFor="mediaType">Select Media Type: </label>
          <select
            id="mediaType"
            value={mediaType}
            onChange={handleMediaTypeChange}
            className={styles.dropdown}
          >
            <option value="music">Music</option>
            <option value="videos">Videos</option>
          </select>
        </div>

        {/* Music Tracks Section */}
        {mediaType === "music" && (
          <section className={styles.section}>
            <h2>Music Tracks</h2>
            <div className={styles.grid}>
              {tracks.map((track, index) => (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => handleTrackClick(track)}
                >
                  <h3>{track.title}</h3>
                  <p>{track.artist}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Videos Section */}
        {mediaType === "videos" && (
          <section className={styles.section}>
            <h2>Videos</h2>
            <div className={styles.grid}>
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => handleVideoClick(video)}
                >
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Audio Player */}
        {selectedTrack && (
          <div className={styles.player}>
            <audio ref={audioRef} controls className={styles.audioPlayer}>
              <source src={selectedTrack.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <Button onClick={() => setSelectedTrack(null)}>Stop</Button>
          </div>
        )}

        {/* Video Player */}
        {selectedVideo && (
          <div className={styles.player}>
            <video ref={videoRef} controls className={styles.videoPlayer}>
              <source src={selectedVideo.url} type="video/mp4" />
              Your browser does not support the video element.
            </video>
            <Button onClick={() => setSelectedVideo(null)}>Stop</Button>
          </div>
        )}
      </div>
      <PageIcon />
      <Footer />
    </>
  );
}