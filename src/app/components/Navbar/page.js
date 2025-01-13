import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";

// The Navbar component is a presentational component that renders a list of links to different pages in the app.
// The Navbar component uses the Link component from the next/link module to create client-side navigation between pages.
// The Navbar component also uses the styles object from the Navbar.module.css file to style the links.
export default function Navbar() 
{
    return (
        <>
            
            <nav className={styles.navbar}>
                <div className={styles.logoWrapper}>
                    <Image 
                            src="/logo.webp" 
                            alt="The Name of a Band"   
                            width={200}
                            height={200}
                            styles={styles.Image}
                    ></Image>
                </div>
                <h1>The Name of a Band</h1>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                    <Link href="/">Home</Link>
                    </li>
                    <li className={styles.navItem}>
                    <Link href="/about">About</Link>
                    </li>
                    <li className={styles.navItem}>
                    <Link href="/merchandise">Merchandise</Link>
                    </li>
                    <li className={styles.navItem}>
                    <Link href="/contact">Contact</Link>
                    </li>
                    <li className={styles.navItem}>
                    <Link href="/shows">Shows</Link>
                    </li>
                    <li className={styles.navItem}>
                    <Link href="/media">Media</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}