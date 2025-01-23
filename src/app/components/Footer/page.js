import Image from "next/image";
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.container}>
        <div className={styles.content}>
            {/* Your main content goes here */}
        </div>
        <div className={styles.footer}>
             <div className={styles.footerIcons}>
                <a href="https://www.instagram.com/">
                    <Image 
                        src="/assets/icons/instagram.png" 
                        alt="instagram"
                        width={40}
                        height={40}
                        className={styles.Image} 
                    />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61567175613865/">
                    <Image 
                        src="/assets/icons/facebook.png" 
                        alt="instagram"
                        width={40}
                        height={40}
                        className={styles.Image} 
                    />
                </a>
            </div>
            <ul className={styles.footerList}>
            <li className={styles.footerContact}>
                <h3>Contact</h3>
                <p>Phone: 555-555-555</p>
                <p>Email:</p>
            </li>
           
            <li className={styles.footerAboutUs}>
                <Link href="/about-us"><h3>About us</h3>
                <p>Phone: 555-555-555</p>
                <p>Email:</p>
                </Link>
            </li>
            <li className={styles.PrivacyPolicy}>
                <h3>Privacy Policy</h3>
                <p>Phone: 555-555-555</p>
                <p>Email:</p>
            </li>
             </ul>
           
        </div>
    </div>
    );
}