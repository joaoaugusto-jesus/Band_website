"use client";
import { useCartStore } from '../store/cartStore';
import styles from './Cart.module.css';
import Navbar from '../components/Navbar/page';
import Footer from '../components/Footer/page';
import PageIcon from '../components/Icons/page';
import Button from '../components/Button';
import Image from 'next/image';

export default function Cart() {
    const { cart, removeFromCart, clearCart, totalCartPrice } = useCartStore();

    return (
        <>
            <Navbar />

            <div className={styles.layout}>
                <div className={styles.cartContainer}>
                   
                    {cart.length === 0 ? (
                        <div className={styles.emptyCart}><h1>Cart is Empty</h1> </div>
                    ) : (
                        cart.map((item) => (
                            <div key={`${item.id}-${item.size}`} className={styles.cartItem}>
                                <Image alt={item.alt}
                                        src={item.src}
                                        width={200} 
                                        height={250} 
                                        className={styles.imgCart}>
                                </Image>
                                <div className={styles.cardItems}>
                                <p>{item.name} - {item.size} x {item.quantity}</p>
                                <p>Price per unit: ${item.price|| "0.00"}</p>
                                <p>Total Price: ${item.totalPrice|| "0.00"}</p>
                                <Button onClick={() => removeFromCart(item.id, item.size)}>Remove</Button>
                            </div>
                            </div>
                        ))
                    )}

                   
                </div> 
                {cart.length > 0 && (
                        <div className={styles.totalItems}>
                            <h3>Total: ${totalCartPrice()?.toFixed(2)}</h3>
                            <Button onClick={clearCart}>Clear Cart</Button>
                        </div>
                    )}
            </div>
                   
            <PageIcon />
            <Footer />
        </>
    );
}
