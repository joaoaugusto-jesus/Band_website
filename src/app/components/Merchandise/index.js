'use client';
import { shirts } from '../../Data/shirts';
import styles from './Merchandise.module.css';
import { motion } from 'framer-motion';
import Card from '../Card/page';


export default function Merchandise() {


  return (
    <div className={styles.container}>
         <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ 
          once: true,
          margin: "0px 0px -100px 0px" 
        }}
          transition={{ 
          duration: 0.8,
          delay: 0.2 // Optional slight delay
        }}
          className={styles.title}
      >
        Merchandise
      </motion.h1>
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
    
    </div>
  );
}