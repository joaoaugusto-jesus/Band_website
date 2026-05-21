"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";


export default function LandingPage() {
  const { t } = useTranslation("common");
  const [showBtnMessage, setShowBtnMessage] = useState(false);


  return (
    <div className={styles.page}>
      <Image
        src="/assets/img/Cartel logo.jpeg"
        alt="Band Logo"
        width={500}
        height={400}
        className={styles.landingImg}
        sizes="(max-width: 600px) 90vw, 500px"
        priority
      />

      <Link href="/home" className={styles.linkWrapper}>
  <div
    className={styles.buttonWrapper}
    onMouseEnter={() => setShowBtnMessage(true)}
    onMouseLeave={() => setShowBtnMessage(false)}
  >
    {showBtnMessage && (
      <div className={styles.btnMessage}>
        Enter if you dare
      </div>
    )}

    <button className={styles.enterButton}>
      {t("freedom")}
    </button>
  </div>
</Link>
    </div>
  );
}