import Image from 'next/image';
import styles from './icons.module.css';

export default function PageIcon() {
    return (
        <div className={styles.containerIcons}>
            <div className={styles.pageIcons}>
                <a href="https://www.instagram.com/">
                    <Image src="/assets/icons/instagram.png" alt="Instagram" width={50} height={50} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61567175613865/">
                  <Image src="/assets/icons/facebook.png" 
                  alt="Facebook" width={50} height={50} 
                  />
                </a>
            </div>
        </div>
    );
}
