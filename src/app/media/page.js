"use client";

import { useState, useRef} from "react";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import Button from "../components/Button";
import PageIcon from "../components/Icons/page";
import AudioPlayerWithEQ from "../components/AudioPlayer/AudioPlayerWithEQ.jsx";
import styles from "./Media.module.css";
import { tracks } from "../Data/music-tracks";
import { videos } from "../Data/music-videos";
import { useTranslation } from "react-i18next";

export default function Media() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [mediaType, setMediaType] = useState("music");
  const { t } = useTranslation("media");

  const videoRef = useRef(null);

  // Handle track selection
  const handleTrackClick = (track) => {
    // Stop video if playing
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setSelectedVideo(null);
    setSelectedTrack(track);
  };

  // Handle video selection
  const handleVideoClick = (video) => {
    // Stop audio if playing
    setSelectedTrack(null);

    if (videoRef.current) {
      videoRef.current.src = video.src;
      videoRef.current.play();
    }

    setSelectedVideo(video);
  };

  // Handle media type change
  const handleMediaTypeChange = (event) => {
    setMediaType(event.target.value);
    setSelectedTrack(null);
    setSelectedVideo(null);

    // Stop any playing media
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.mediaContainer}>
        <h1 className={styles.title}>{t("mediaGallery")}</h1>

        {/* Dropdown Selector */}
        <div className={styles.dropdownContainer}>
          <label htmlFor="mediaType">{t("selectMediaType")}</label>
          <select
            id="mediaType"
            value={mediaType}
            onChange={handleMediaTypeChange}
            className={styles.dropdown}
          >
            <option value="music">{t("music")}</option>
            <option value="videos">{t("videos")}</option>
          </select>
        </div>

        {/* Music Tracks */}
        {mediaType === "music" && (
          <section className={styles.section}>
            <h2>{t("music")}</h2>
            <div className={styles.grid}>
              {tracks.map((track, idx) => (
                <div
                  key={idx}
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

        {/* Videos */}
        {mediaType === "videos" && (
          <section className={styles.section}>
            <h2>{t("videos")}</h2>
            <div className={styles.grid}>
              {videos.map((video, idx) => (
                <div
                  key={idx}
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
            <AudioPlayerWithEQ
              src={selectedTrack.src}
              title={selectedTrack.title}
              artist={selectedTrack.artist}
              cover={selectedTrack.cover}
            />
            <Button
             className={styles.stopButton}   
             onClick={() => setSelectedTrack(null)}>Stop</Button>
          </div>
        )}

        {/* Video Player */}
        {selectedVideo && (
          <div className={styles.player}>
            <video ref={videoRef} controls className={styles.videoPlayer}>
              <source src={selectedVideo.src} type="video/mp4" />
             {t("videoNotSupported")}
            </video>
           
          </div>
        )}
      </div>
      <PageIcon />
      <Footer />
    </>
  );
}
