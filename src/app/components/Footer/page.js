import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.containerFooter}>
            <div className={styles.content}>
                {/* Your main page content goes here */}
            </div>
            <footer className={styles.footer}>
                <ul className={styles.footerList}>
                    <li className={styles.footerContact}>
                        <h3>Contact</h3>
                        <p>Phone: 555-555-555</p>
                        <p>Email:</p>
                    </li>
                    <li className={styles.footerAboutUs}>
                        <Link href="/about-us">
                            <h3>About us</h3>
                            
                            
                            <p>Email:</p>
                        </Link>
                    </li>
                    <li className={styles.privacyPolicy}>
                        <h3>Privacy Policy</h3>
                        <p>Phone: 555-555-555</p>
                        <p>Email:</p>
                    </li>
                </ul>
            </footer>
        </div>
    );
}
