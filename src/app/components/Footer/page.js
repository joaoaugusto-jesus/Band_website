import Image from "next/image";
import styles from "./Footer.module.css";


export default function Footer() {
    return (
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
            </div>
            <ul className={styles.footerList}>
            <li className={styles.footerContact}>
                <h3>Contact</h3>
                <p>Phone: 555-555-555</p>
                <p>Email:</p>
            </li>
           
            <li className={styles.footerAboutUs}>
                <h3>About us</h3>
                <p>Phone: 555-555-555</p>
                <p>Email:</p>
            </li>
            <li className={styles.PrivacyPolicy}>
                <h3>Privacy Policy</h3>
                <p>Phone: 555-555-555</p>
                <p>Email:</p>
            </li>
             </ul>
           
        </div>
    );
}