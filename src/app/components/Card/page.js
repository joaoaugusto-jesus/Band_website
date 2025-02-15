"use client";
import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import styles from './Card.module.css'
import Button from '../Button'
import Image from 'next/image'







export default function Card({ src, name, price, className, id }) {
  
  const [selectedSize, setSelectedSize] = useState({});
  const [quantities, setQuantities] = useState({});
  const { cart, addToCart } = useCartStore();


  // Handle size selection
  const handleSizeChange = (id, size) => {
    setSelectedSize((prev) => ({ ...prev, [id]: size }));
};

// Handle quantity change
const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
        ...prev,
        [id]: Math.max(0, (prev[id] || 0) + change),
    }));
};


    return (
        <div className={`${styles.card} ${className}`}>
            <Image src={src} alt={name} width={50} height={50} className={styles.photo} />
            <div className={styles.overlay}>
                <h2 className={styles.name}>{name}</h2>
                 {/* Size Selector */}
                 <select 
                    className={styles.sizeSelector}
                                        value={selectedSize[id] || ""}
                                        onChange={(e) => handleSizeChange(id, e.target.value)}
                                    >
                                        <option value="">Select Size</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>

                                    {/* Quantity Selector */}
                                    <div className={styles.quantitySelector}>
                                        <button 
                                            onClick={() => handleQuantityChange(id, -1)}
                                            className={styles.qtyButton}>-
                                            </button>
                                        <span className={styles.quantitiesSelector}>{quantities[id] || 0}</span>
                                        <button onClick={() => handleQuantityChange(id, 1)}
                                            className={styles.qtyButton}>+</button>
                                    </div>                    
                                        <p className={styles.price}>${price}</p>
                                    <Button 
                                        className={styles.addButton}
                                        onClick={() => {
                                            if (!selectedSize[id]) {
                                                alert("Please select a size before adding to cart.");
                                                return;
                                            }
                                            if (!quantities[id] || quantities[id] < 1) {
                                                alert("Please select at least one item.");
                                                return;
                                            }
                                            addToCart({
                                                ...id,
                                                size: selectedSize[id],
                                                quantity: quantities[id],
                                            });
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
            </div>
        </div>
    )
}
