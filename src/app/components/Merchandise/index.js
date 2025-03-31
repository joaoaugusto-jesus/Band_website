'use client';
import { shirts } from '../../Data/shirts';
import styles from './Merchandise.module.css';

import Card from '../Card/page';


export default function Merchandise() {


  return (
    <div className={styles.container}>
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
    
    </div>
  );
}