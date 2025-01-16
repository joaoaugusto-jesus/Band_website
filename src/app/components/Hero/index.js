import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.logoBackground}>
              <section className={styles.sectionHeader}> 
                <h1>The Snazzy Raggamuffins</h1>
                <p>Rock´n roll Covers and Original songs</p>
                
                </section>     
           <audio controls className={styles.audioPlayer}>
                    <source src="/assets/musics/perpetual.mp3" type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
                <video controls className={styles.videoPlayer}>
                    <source src="/assets/vid/snazzy live at fandango.mp4" type="video/mp4" />
                    Your browser does not support the video element.
                </video>
            </div>
        </div> 
      
    );
}