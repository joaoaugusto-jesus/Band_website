import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.logoBackground}>
                   
                <h1>Welcome to Our Band Website</h1>
                <p>Explore our latest updates!</p> 
            </div>
        </div> 
      
    );
}