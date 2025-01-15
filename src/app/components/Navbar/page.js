"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        document.getElementById("menu-icon").classList.toggle(styles.change);
    };

    return (
        <header>
            <nav className={styles.navbar}>
                <button className={styles.logoWrapper} link="./">
                    <Image 
                        src="/logo.webp" 
                        alt="The Name of a Band"   
                        width={200}
                        height={200}
                        className={styles.image}
                       
                        
                    />
                    
                </button>
                <h1 className={styles.title}>The Name of a Band</h1>
                
                
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/">Merchandise</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/about">Live shows</Link>
                    </li>
                    {/* dropdown menu */}
                    <li className={styles.navItem}>
                        <button 
                            id="menu-icon"
                            onClick={toggleDropdown} 
                            className={styles.dropdownToggle}
                            aria-expanded={dropdownOpen}
                            aria-controls="dropdown-menu"
                        >
                            <div className={styles.bar1}></div>
                            <div className={styles.bar2}></div>
                            <div className={styles.bar3}></div>
                        </button>
                        {dropdownOpen && (
                            <ul id="dropdown-menu" className={styles.dropdownMenu}>
                                <li className={styles.dropdownItem}>
                                    <Link href="/services">Services</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}