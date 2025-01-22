import styles from './Subscribe.module.css';
import Button from '../Button';

export default function Subscribe() {
    

    return (    
        <section id="subscribe" className={styles.subscribe}>
            <div className={styles.subscribeContainer}>
                <div className={styles.subscribeContent}>
                    <h2 className={styles.subscribeTitle}>Subscribe to our newsletter</h2>
                    <p className={styles.subscribeText}>Subscribe to our newsletter and get 20% off your first purchase</p>
                    <form className={styles.subscribeForm} >
                        <input type="email" className={styles.subscribeEmail} placeholder="Enter your email" />
                        <Button className={styles.subscribeButton}>Subscribe</Button>
                    </form>
                </div>
            </div>
        </section>
    );

}