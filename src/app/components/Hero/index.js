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


export default function Hero() {
  
  return (
    <div className={styles.layout}>
      
      <section className={styles.sectionHeader}>
        <p className={styles.headerTitle}>[Cartel Cortez]</p>
       
       
        
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