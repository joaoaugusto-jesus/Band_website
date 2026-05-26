import styles from './Subscribe.module.css';
import Button from '../Button';
import { useTranslation } from 'react-i18next';


export default function Subscribe() {
    const { t } = useTranslation("subscribe");

    return (    
        <section id="subscribe" className={styles.subscribe}>
            <div className={styles.subscribeContainer}>
                <div className={styles.subscribeContent}>
                    <h2 className={styles.subscribeTitle}>{t("subscribeTitle")}</h2>
                    <p className={styles.subscribeText}>{t("subscribeText")}</p>
                    <form className={styles.subscribeForm} >
                        <input type="email" className={styles.subscribeEmail} placeholder={t("emailPlaceholder")} />
                        <Button className={styles.subscribeButton}>{t("subscribeButton")}</Button>
                    </form>
                </div>
            </div>
        </section>
    );

}