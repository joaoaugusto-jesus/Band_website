import { shirts } from '../../Data/shirts';
import Image from 'next/image';
import styles from './Merchandise.module.css';


export default function Merchandise() {


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Merchandise</h1>
      <div className={styles.grid}>
        {
        shirts && shirts.length > 0 ? 
        (shirts.map((shirt) => (
          <div key={shirt.id} className={styles.card}>
            <Image src={shirt.src} alt={shirt.name} width={100} height={100} className={styles.photo}/>
            <h2 className={styles.name}>{shirt.name}</h2>
            <p className={styles.price}>${shirt.price}</p>
          </div>
        ))
        ) : (
          <h2 className={styles.unavailable}>No shirts available</h2>
        )
        }
      </div>
    </div>
  );
}