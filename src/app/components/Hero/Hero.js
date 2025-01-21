import LayoutBg from '../LayoutBg/page';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <div className={styles.layout}>
            <LayoutBg />
            <div className={styles.sectionHeader}>
                <h1>The Snazzy Team</h1>
                <p>Rock & Roll Covers and Original Songs</p>
            </div>
            <video className={styles.videoPlayer} controls>
                <source src="/path/to/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <audio className={styles.audioPlayer} controls>
                <source src="/path/to/audio.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}