import Image from 'next/image';
import styles from './icons.module.css';

export default function PageIcon() {
    return (
        <div className={styles.containerIcons}>
            <div className={styles.pageIcons}>
                <div className={styles.borderIcons}>
                  <a href="https://www.instagram.com/">
                      <Image src="assets/icons/instagram.png" alt="Instagram" 
                      width={60} height={60} />
                  </a>
                  </div>
                
              <div className={styles.borderIcons}>
                  <a href="https://www.facebook.com/profile.php?id=61567175613865/">
                    <Image src="assets/icons/facebook.png" 
                    alt="Facebook" width={40} height={40} 
                    />
                  </a>
                
                </div>
                <div className={styles.borderIcons}>
                  <a href="https://www.facebook.com/profile.php?id=61567175613865/">
                    <Image className={styles.youtubeIcon} src="assets/icons/youtube.png" 
                    alt="Facebook" width={55} height={50} 
                    />
                </a>
                </div>
                <div className={styles.borderIcons}>
                  <a href="https://www.facebook.com/profile.php?id=61567175613865/">
                    <Image src="assets/icons/spotify.png" 
                    alt="Facebook" width={70} height={40} 
                    />
                  </a>
                </div>
                </div>
        </div>
    );
}
