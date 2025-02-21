"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MdLogin, MdLogout } from "react-icons/md";
import { useCartStore } from '../../store/cartStore';
import { TiShoppingCart } from "react-icons/ti";
import { useSession, signOut } from "next-auth/react";



export default function Navbar() {

    const { cart } = useCartStore();
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0); // Count items in cart
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { data: session } = useSession();




    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        document.getElementById("menu-icon").classList.toggle(styles.change);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest(`#menu-icon`) && dropdownOpen) {
                setDropdownOpen(false);
                document.getElementById("menu-icon").classList.remove(styles.change);
            }
        };
    
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [dropdownOpen]);
    
    return (
        <header>
            <nav className={styles.navbar}>
            <div className={styles.leftSection}>
            <Link className={styles.logoWrapper} href="/">
            
                        <Image 
                            src="/assets/img/cartel-logo-yellow.png"
                            alt="The Name of a Band"   
                            width={400}
                            height={400}
                            className={styles.image}
                        />
                  
                </Link> 
                {session && (
                    <div className={styles.userName}>
                    <span className={styles.userNameText}> {session.user?.email}</span> 
                </div>
               ) }
                </div>
                <div className={styles.navLinks}>                 
                    <div className={styles.cartContainer}> 
                        
                        <Link href="/cart"> <TiShoppingCart
                            className={styles.cart}
                        />
                        
                        </Link>  {/* Show cart count */}
                       <p className={styles.itemCount}>({itemCount})</p>
                    </div>
                    <div className={styles.loginContainer}>
                      
                        {session ? (
          <>
           
           
             <MdLogout onClick={() => signOut()} className={styles.login}/>
         
          </>
        ) : (
            <Link href='/login'>
          <MdLogin className={styles.login}/></Link>
        )}
                     
                     </div>
                <ul className={styles.navList}>
                    
                    {/* dropdown menu */}
                    <li className={styles.navItem}>
                        <div 
                            id="menu-icon"
                            onClick={toggleDropdown} 
                            className={styles.dropdownToggle}
                            aria-expanded={dropdownOpen}
                            aria-controls="dropdown-menu"
                        >
                            <div className={styles.bar1}></div>
                            <div className={styles.bar2}></div>
                            <div className={styles.bar3}></div>
                        </div>
                        {dropdownOpen && (
                             <ul id="dropdown-menu" className={styles.dropdownMenu}>
                                <li className={styles.dropdownItem}>  
                                        <Link href="/media">Media</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                        <Link href="/login">Login</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                        <Link href="/about-us">About us</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link href="/store">Store</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link href="/cart">Cart</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link href="/contact-us">Contact</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                 </ul> 
                </div>
   
            </nav>
        </header>
    );
}