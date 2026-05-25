"use client";

import Image from "next/image";
import styles from "./Modal.module.css";
import { useTranslation } from "react-i18next";

export default function Modal({ isOpen, onClose, musician }) {
  const { t } = useTranslation("about"); // ✅ FIXED

  if (!isOpen || !musician) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.musicianContainer}>
          <Image
            src={musician.image}
            width={400}
            height={400}
            alt={musician.alt}
            className={styles.musicianImage}
          />

          <div className={styles.musicianInfo}>
            <h2>{t(`musicians.${musician.id}.name`)}</h2>
            <p>{t(`musicians.${musician.id}.description`)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}