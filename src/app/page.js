"use client";

import { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/page";
import Hero from "./components/Hero";
import styles from "./page.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";
 // inicializa o i18next antes de usar useTranslation


export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true);
  const [closing, setClosing] = useState(false);
  const [showBtnMessage, setShowBtnMessage] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation("common");

  return (
    <div className={styles.page}>
       <Head>
        <title>Band Website - Landing</title>
        <meta name="description" content="Official landing page of the band. Enter the site to check out music, videos, merchandise, and live shows." />
        <meta name="keywords" content="band, music, videos, merchandise, live shows" />
        <meta name="author" content="The Band Name" />
        <meta property="og:title" content="Band Website - Landing" />
        <meta property="og:description" content="Official landing page of the band." />
        <meta property="og:image" content="/assets/img/cartel-cortez-landingpage.png" />
        <meta property="og:url" content="https://yourbandwebsite.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/logo.ico" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <AnimatePresence>
        {showLanding ? (
          <motion.main
            key="landing"
            className={styles.landing}
            initial={{ opacity: 0 }}
            animate={{ opacity: 5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            {setHovered && (
              <div className={styles.hoverMessage}>
                {hovered ? "Você não Acha" : ""}
              </div>
            )}
            <Image src="/assets/img/cartel-cortez-skeleton-hands (1).png"
              alt="Band Logo"
              width={600}
              height={700}
              className={styles.landingImage}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}>
             </Image>
              
            {showBtnMessage &&  (<div className={styles.btnMessage}>{t ("enterMessage")}</div>)}
            <button
              onMouseEnter={() => setShowBtnMessage(true)}
              onMouseLeave={() => setShowBtnMessage(false)}
              className={styles.enterButton}
              onClick={() => setShowLanding(false)}
            >
             {t ("freedom")}
            </button>
          </motion.main>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
          >
            <Navbar />
            <Hero />
          
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
