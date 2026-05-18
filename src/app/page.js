"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/page";
import Hero from "./components/Hero";
import styles from "./page.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true);
  const [showBtnMessage, setShowBtnMessage] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { t } = useTranslation("common");

  return (
    <div className={styles.page}>
      <AnimatePresence>
        {showLanding ? (
          <motion.main
            className={styles.landing}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {hovered && (
              <div className={styles.hoverMessage}>
                Punks not Dead
              </div>
            )}

            <Image
              src="/assets/img/cartel-cortez-skeleton-hands (1).png"
              alt="Band Logo"
              width={600}
              height={700}
              className={styles.landingImage}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              priority
            />

            {showBtnMessage && (
              <div className={styles.btnMessage}>
                {t("Enter Site")}
              </div>
            )}

            <button
              onMouseEnter={() => setShowBtnMessage(true)}
              onMouseLeave={() => setShowBtnMessage(false)}
              onClick={() => setShowLanding(false)}
              className={styles.enterButton}
            >
              {t("freedom")}
            </button>
          </motion.main>
        ) : (
          <motion.div>
            <Navbar />
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}