"use client";
import styles from "./Footer.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation("footer");

    return (
        <div className={styles.containerFooter}>
            <div className={styles.content}>
                {/* Your main page content goes here */}
            </div>
            <footer className={styles.footer}>
                <ul className={styles.footerList}>
                    <li className={styles.footerContact}>
                        <h3>{t("contact")}</h3>
                        <p>{t("phone")}: 555-555-555</p>
                        <p>{t("email")}:</p>
                    </li>
                    <li className={styles.footerAboutUs}>
                        <Link href="/about-us">
                            <h3>{t("aboutUs")}</h3>
                            <p>{t("phone")}: 555-555-555</p>
                            <p>{t("email")}:</p>
                        </Link>
                    </li>
                    <li className={styles.privacyPolicy}>
                        <h3>{t("privacyPolicy")}</h3>
                        <p>{t("phone")}: 555-555-555</p>
                        <p>{t("email")}:</p>
                    </li>
                </ul>
            </footer>
        </div>
    );
}
