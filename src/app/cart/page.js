"use client";
import { useCartStore } from '../store/cartStore';
import styles from './Cart.module.css';
import Navbar from '../components/Navbar/page';
import Footer from '../components/Footer/page';
import PageIcon from '../components/Icons/page';
import Button from '../components/Button';
import Link from 'next/link';

export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCartStore();

    return (

        <>
        <Navbar />
        
        <div className={styles.layout}>
        <div className={styles.cartContainer}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? <p>Cart is empty</p> : (
                cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className={styles.cartItem}>
                        <p>{item.name} - {item.size} x {item.quantity}</p>
                        <Button onClick={() => removeFromCart(item.id, item.size)}>Remove</Button>
                    </div>
                ))
            )}
            {cart.length > 0 && <Button onClick={clearCart}>Clear Cart</Button>}
        </div>
        </div>
        <PageIcon />
        <Footer />
        </>
    );
}
