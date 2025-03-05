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

const videos = [
  {
    name: "teaser",
    src: "assets/vid/Cartel Cortez Teaser.mp4",
  },
 
];

export default function Hero() {
  
  return (
    <div className={styles.layout}>
      
      <section className={styles.sectionHeader}>
        <div className={styles.headerTitle}>
          <Image
            src="/assets/img/Cartel Banner White.png"
            sizes="(max-width: 700px) 100vw, 700px"
            style={{ width: "80%", height: "auto" }}
            alt="Cartel Cortez"
            width={700}
            height={200}
            priority/>  
        </div>
       
       <video 
          className={styles.videoTeaser}  
          controls
          autoPlay
          muted >                              
         <source src={videos[0].src} type="video/mp4" />
         Your browser does not support the video element.
      </video>
        
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