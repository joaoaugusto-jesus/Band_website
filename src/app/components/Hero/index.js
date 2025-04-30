"use client";

import { useState, useRef } from "react";
import LayoutBg from "../LayoutBg/page";
import styles from "./Hero.module.css";
import Subscribe from '../Subscribe';
import Gallery from '../Gallery/page';
import Footer from "../Footer/page"; 
import PageIcon from "../Icons/page";
import Agenda from "../Agenda/page";
import Merchandise from "../Merchandise";
import Image from "next/image";
import { videos } from "../../Data/music-videos";
import {  motion, useAnimation, useInView, whileHover } from "framer-motion";
import { useEffect } from "react";


export default function Hero() {



const controls = useAnimation();
const headerRef = useRef(null);
const isInView = useInView(headerRef, { once: false, margin: "-50px" });
const whileHover = useInView(headerRef, { once: false, margin: "-50px" });


useEffect(() => {
  if (isInView) {
    controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    });
  } else {
    controls.start({ opacity: 0, x: -100 });
  }
}, [isInView, controls]);


  return (
  
    <div className={styles.layout}>
      
       
        
      <section className={styles.sectionHeader}>
      
        
 
     </section>
    
     <section className={styles.sectionContent}>
      <motion.div
         ref={headerRef}
         animate={controls}
         initial={{ opacity: 0, x: 100 }}
         
        className={styles.headerTitle}>
     
          <h1 className={styles.title}>Your Sports Partner</h1>
          <p className={styles.description}>The last rock album </p>
          <p className={styles.description}>made by humans</p>
          <a href="/store"><h2 className={styles.subtitle}>Buy now and get free Cartel shipping</h2></a>
        
        </motion.div>
       <div className={styles.videoContainer}>
         <motion.div
           initial={{ opacity: 0, x: 100 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: "easeInOut" }}
           whileHover={{ scale: 1.20 }}
           className={styles.videoBg}>
          <video 
              className={styles.videoTeaser}  
              controls
              autoPlay
              muted >                              
            <source src={videos[0].src} type="video/mp4" />
            Your browser does not support the video element.
          </video>
          </motion.div>
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