import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.logoBackground}>
                   
            <h1>The Name of a Band</h1>
                <p>Welcome to our official website</p>
                <audio controls className={styles.audioPlayer}>
                    <source src="/path/to/your/music-file.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <video controls className={styles.videoPlayer}>
                    <source src="/path/to/your/video-file.mp4" type="video/mp4" />
                    Your browser does not support the video element.
                </video>
            </div>
        </div> 
      
    );
}