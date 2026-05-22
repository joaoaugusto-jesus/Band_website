"use client";

import { useRef, useEffect } from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { videos } from "../../Data/music-videos";
import Navbar from "../Navbar/page";
import Merchandise from "../Merchandise";
import Agenda from "../Agenda/page";
import Gallery from "../Gallery/page";
import Subscribe from "../Subscribe";
import PageIcon from "../Icons/page";
import Footer from "../Footer/page";

export default function Hero() {
  const controls = useAnimation();
  const headerRef = useRef(null);

  const isInView = useInView(headerRef, {
    once: false,
    margin: "-50px",
  });

  const { t } = useTranslation("hero");

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    } else {
      controls.start({
        opacity: 0,
        x: -100,
      });
    }
  }, [isInView, controls]);

  return (
    <div className={styles.layout}>
      <section className={styles.sectionHeader}>
        <Image
          src="/assets/img/cartel-band-photo-bg-black.png"
          alt="Background Image"
          width={300}
          height={300}
          className={styles.bgImg}
        />
      </section>

      <section className={styles.sectionContent}>
        <motion.div
          ref={headerRef}
          animate={controls}
          initial={{ opacity: 0, x: 100 }}
          className={styles.headerTitle}
        >
          <p className={styles.title}>{t("Your Sports Partner")}</p>
          <p className={styles.description}>{t("The last rock album")}</p>
          <p className={styles.description}>{t("made by humans")}</p>

          <a href="/store" className={styles.subtitleLink}>
            <h2 className={styles.subtitle}>
              {t("Buy now and get free Cartel shipping")}
            </h2>
          </a>
        </motion.div>

        <div className={styles.videoContainer}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            className={styles.videoBg}
          >
            <video
              className={styles.videoTeaser}
              controls
              autoPlay
              muted
            >
              <source src={videos[0].src} type="video/mp4" />
              {t("Your browser does not support the video element.")}
            </video>
          </motion.div>
        </div>
      </section>

      <Navbar />
      <Merchandise />
      <Agenda />
      <Gallery />
      <Subscribe />
      <PageIcon />
      <Footer />
    </div>
  );
}