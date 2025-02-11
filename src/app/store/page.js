import styles from './Store.module.css';
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import PageIcon from "../components/Icons/page";
import { shirts } from '../Data/shirts';
import Image from 'next/image';
import Button from '../components/Button';
import { albuns } from '../Data/albuns';

export default function Store() {
    return (
        <>
            <Navbar />
        <div className={styles.layout}>
                <div className={styles.title}>
                    <h1>Store</h1>
                    <p>Buy our music and merchandise</p>
                </div>  
               <div className={styles.gridShirt}>
                    {
                    shirts && shirts.length > 0 ? 
                    (shirts.map((shirt) => (
                    <div key={shirt.id} className={styles.card}>
                        <Image src={shirt.src} alt={shirt.name} width={50} height={50} className={styles.photo}/>
                        <div className={styles.overlay}>
                        <h2 className={styles.name}>{shirt.name}</h2>
                        <p className={styles.price}>${shirt.price}</p>
                        <Button className={`${styles.Button}`}>Add to Cart</Button>
                    </div>
                    </div>
                    ))
                    ) : (
                    <h2 className={styles.unavailable}>No shirts available</h2>
                    )
                    } 
                    
                </div> 
                    <div className={styles.gridAlbum}> 
                        {albuns && albuns.length > 0 ?
                        (albuns.map((album) => (
                            <div key={album.id} className={styles.card}>
                                <Image src={album.src} alt={album.name} width={50} height={50} className={styles.photo}/>
                                <div className={styles.overlay}>
                                    <h2 className={styles.name}>{album.name}</h2>
                                    <p className={styles.price}>${album.price}</p>
                                    <Button className={`${styles.Button}`}>Add to Cart</Button>
                                </div>
                            </div>
                        ))
                        ) : (
                            <h2 className={styles.unavailable}>No albuns available</h2>
                        )
                    }
                    </div>
            
                
       </div>
            <PageIcon />
            <Footer />
        </>
    )

}