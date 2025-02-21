"use client";
import { useCartStore } from '../store/cartStore';
import styles from './Cart.module.css';
import Navbar from '../components/Navbar/page';
import Footer from '../components/Footer/page';
import PageIcon from '../components/Icons/page';
import Button from '../components/Button';
import Image from 'next/image';
import { CiCircleRemove } from "react-icons/ci";
import { useSession } from 'next-auth/react'; // Import useSession

export default function Cart() {
    const { cart, removeFromCart, clearCart, totalCartPrice } = useCartStore();
    const { data: session } = useSession(); // Get the user session

    const handlePurchase = async () => {
        if (!session) {
            alert("Please log in to complete your purchase.");
            return;
        }

        try {
            const res = await fetch('/api/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: session.user.id, // Pass the user ID
                    items: cart, // Pass the cart items
                    
                    totalPrice: totalCartPrice(), // Pass the total price
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Purchase successful!");
                clearCart(); // Clear the cart after purchase
            } else {
                alert(data.error || "Purchase failed");
            }
        } catch (error) {
            console.error("Purchase error:", error);
            alert("Purchase failed");
        }
    };


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
                                <p>{item.name}  {item.size}</p>
                                <div onClick={() => removeFromCart(item.id, item.size)} className={styles.cardItemsRemove}>
                                <p>Items: x{item.quantity}</p><CiCircleRemove className={styles.iconRemove}/></div>
                                <p>Price per unit: ${item.price|| "0.00"}</p>
                                <p>Total Price: ${item.totalPrice|| "0.00"}</p>
                                
                            </div>
                        </div>
                        ))
                    )}

                   
                </div> 
                {cart.length > 0 && (
                        <div className={styles.totalItems}>
                            <h3>Total: ${totalCartPrice()?.toFixed(2)}</h3>
                            <Button onClick={handlePurchase}>Buy Now</Button>
                            <Button onClick={clearCart}>Clear Cart</Button>
                        </div>
                    )}
            </div>
                   
            <PageIcon />
            <Footer />
        </>
    );
}
