"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MdLogin, MdLogout } from "react-icons/md";
import { useCartStore } from '../../store/cartStore';
import { TiShoppingCart } from "react-icons/ti";
import { FaBars } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
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
                            src="/assets/img/Cartel Banner White.png"
                            alt="The Name of a Band" 
                            width={100}
                            height={60}
                            className={styles.image}
                            style={{borderRadius: "14%"}}
                        />
                  
                </Link> 
                {session && (
                    <div className={styles.userName}>
                    <span className={styles.userNameText}> {session.user?.email}</span> 
                </div>
               ) }
                </div>
                <div className={styles.navLinks}>                 
                    
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
                     <div className={styles.cartContainer}> 
                        
                        <Link href="/cart"> <TiShoppingCart
                            className={styles.cart}
                        />
                        
                        </Link>  {/* Show cart count */}
                       <p className={styles.itemCount}>{itemCount > 0 && `(${itemCount})`}</p>
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
                                {dropdownOpen ? (
                                    <IoIosClose className={styles.closeBtn} />
                                ) : (
                                    <FaBars className={styles.burguerBtn} />
                                )}
                            </div>
                        {dropdownOpen && (
                           
                             <ul id="dropdown-menu" className={styles.dropdownMenu}>
                               
                                <li className={styles.dropdownItem}>
                                        <Link href="/login">Login</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link href="/store">Store</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                        <Link href="/about-us">About us</Link>
                                </li>
                                
                                <li className={styles.dropdownItem}>
                                    <Link href="/cart">Cart</Link>
                                </li> 
                                <li className={styles.dropdownItem}>  
                                        <Link href="/media">Media</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link href="/contact-us">Contact</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link href="/booking">Booking</Link>
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