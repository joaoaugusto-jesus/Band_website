"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t } = useTranslation("common");

  return (
    <div className={styles.page}>
      <Image
        src="/assets/img/cartel-cortez-skeleton-hands (1).png"
        alt="Band Logo"
        width={600}
        height={700}
      />

      <Link href="/home">
        <button className={styles.enterButton}>
          {t("freedom")}
        </button>
      </Link>
    </div>
  );
}