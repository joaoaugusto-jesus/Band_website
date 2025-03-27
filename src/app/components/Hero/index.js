"use client";

import { useState, useRef } from "react";
import LayoutBg from "../LayoutBg/page";
import styles from "./Hero.module.css";
import Subscribe from '../Subscribe';
import Gallery from '../Gallery/page';
import Footer from "../Footer/page"; 
import PageIcon from "../Icons/page";
import Agenda from "../Agenda/page";
import Merchandise from "../Merchandise/page";
import Image from "next/image";
import { videos } from "../../Data/music-videos";
import { motion } from "framer-motion";

export default function Hero() {
  
  return (
    <div className={styles.layout}>
      <motion.div
       initial={{ opacity: 0, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8 }}
        >
      <section className={styles.sectionHeader}>
      
        
 
     </section>
     </motion.div>
     <section className={styles.sectionContent}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.headerTitle}>
     
          <h1 className={styles.title}>Your Sports Partner</h1>
          <p className={styles.description}>The last rock album made by humans</p>
          <a href="/store"><h2 className={styles.subtitle}>Buy now and get free Cartel shipping</h2></a>
        
        </motion.div>
       <div className={styles.videoContainer}>
         
          <video 
              className={styles.videoTeaser}  
              controls
              autoPlay
              muted >                              
            <source src={videos[0].src} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        </div>
     </section>
      <Merchandise />
      <Agenda />
      <Gallery />
      <Subscribe />
      <PageIcon />
      <Footer />
    </div>
  );
}