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
                    <h1 className="paragraf">Time Bomb </h1>
                    <h2>Musicians</h2>
                  
                    <div className={styles.container}>
                        <ul className={styles.list}>
                            <li className={styles.items}>Vocals</li>
                            <li className={styles.items}>Guitar</li>
                            <li className={styles.items}>Bass</li>
                            <li className={styles.items}>Drums</li>
                            <li className={styles.items}>Keyboard</li>
                        </ul>
                    </div>
                </div>
            </div>
            <PageIcon />
            <Footer />
        </>
    )
}