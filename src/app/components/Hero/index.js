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
      <LayoutBg />
      <section className={styles.sectionHeader}>
        <h1 className={styles.headerTitle}>The Snazzy Ragamuffins</h1>
        <p className={styles.headerSubTitle}>Rock´n Roll Covers and Original Songs</p>
        <Agenda />
        <Merchandise />
     </section>
      <Gallery />
      <Subscribe />
      <PageIcon />
      <Footer />
    </div>
  );
}