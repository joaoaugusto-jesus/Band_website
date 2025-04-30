'use client';
import { shirts } from '../../Data/shirts';
import styles from './Merchandise.module.css';
import {  motion, useAnimation, useInView  } from "framer-motion";
import { useEffect, useRef } from "react";
import { useState } from 'react';
import Card from '../Card/page';


export default function Merchandise() {

  const controls = useAnimation();
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: false, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    } else {
      controls.start({ opacity: 0, x: 100 });
    }
  }, [isInView, controls]);

  return (
    <div className={styles.container}>
      <motion.div
          ref={headerRef}
          animate={controls}
          initial={{ opacity: 0, x: 100 }}
          className={styles.header}
         >
         <h1
          className={styles.title}
      >
        Merchandise
      </h1>
    
      <div className={styles.grid}>
        {
        shirts && shirts.length > 0 ? 
        (shirts.map((shirt) => (
            <Card 
              key={shirt.id}
              src={shirt.src}
              name={shirt.name}
              price={shirt.price}
              isShirt={true}
                  />
         
        ))
        ) : (
          <h2 className={styles.unavailable}>No shirts available</h2>
        )
        }  
       
      </div>
      </motion.div>
    </div>
  );
}