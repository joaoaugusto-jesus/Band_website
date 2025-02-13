import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import LayoutBg from "../components/LayoutBg/page";
import PageIcon from "../components/Icons/page";
import styles from "./AboutUs.module.css";
import LayoutTb from "../components/LayoutTb/page";

export default function AboutUs() {


    return  (
        <>
            <Navbar />
            <div className={styles.layout}>
                <LayoutTb />
                <div className={styles.title}>
                    
                    <h2>Musicians</h2>
                  
                    <div className={styles.container}>
                        <ul className={styles.list}>
                            <li className={styles.items}><span>Vocals</span></li>
                            <li className={styles.items}><span>Guitar</span></li>
                            <li className={styles.items}><span>Bass</span></li>
                            <li className={styles.items}><span>Drums</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <PageIcon />
            <Footer />
        </>
    )
}