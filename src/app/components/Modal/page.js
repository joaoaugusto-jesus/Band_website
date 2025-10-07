"use client";
import { musicians } from "../../Data/musicians";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./Modal.module.css";
import { useTranslation } from "react-i18next";

export default function Modal({ isOpen, onClose, musician }) {
 const { t } = useTranslation("modal");
const musicianName = t(`musicians.${musicians.id}.description`);



  if (!isOpen || !musician) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.musicianContainer}>
          <Image src={musician.image} width={400} height={400} alt={musician.alt} className={styles.musicianImage} />
          <div className={styles.musicianInfo}>
            <h2 className={styles.musicianName}>  {t(`musicians.${musician.id}.name`, musician.name)}</h2>
           <p className={styles.musicianDescription}> {t(`musicians.${musician.id}.description`, musician.description)}</p></div>
          
        </div> 
      </div>
    </div>
  );
}