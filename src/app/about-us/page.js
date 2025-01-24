import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import LayoutBg from "../components/LayoutBg/page";
import PageIcon from "../components/Icons/page";
import styles from "./AboutUs.module.css";

export default function AboutUs() {


    return  (
        <>
            <Navbar />
            <div className={styles.layout}>
                <LayoutBg />
                <div className={styles.title}>
                    <h1>The Snazzy Team</h1>
                    <h2>Musicians</h2>
                    <p className="paragraf">TIME BOMB</p>
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