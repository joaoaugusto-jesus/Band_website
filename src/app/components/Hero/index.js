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


export default function Hero() {
  
  return (
    <div className={styles.layout}>
      
      <section className={styles.sectionHeader}>
      
        
 
     </section>
     <section className={styles.sectionContent}>

      <div className={styles.headerTitle}>
          <h1 className={styles.title}>Album name</h1>
          <a href="/store"><h2 className={styles.subtitle}>Buy now</h2></a>
        </div>
       
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