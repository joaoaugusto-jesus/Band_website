"use client";
import { musicians } from "../../Data/musicians";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./Modal.module.css";

export default function Modal({ isOpen, onClose, musician }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.musicianContainer}>
          <Image src={musician.image} width={400} height={400} alt={musician.alt} className={styles.musicianImage} />
          <div className={styles.musicianInfo}>
            <h2 className={styles.musicianName}>{musician.name}</h2>
           <p className={styles.musicianDescription}>{musician.description}</p></div>
          
        </div> 
      </div>
    </div>
  );
}