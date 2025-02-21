"use client";
import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import styles from './Card.module.css'
import Button from '../Button'
import Image from 'next/image'
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function Card({ src, name, price, className, id, isShirt, alt }) {
  
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
            <div classname={styles.imageContainer}>
                <Image priority  src={src} alt={name} width={300} height={300} className={styles.photo}  />
            </div>
            
            <div className={styles.overlay}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.price}>${price}</p>
                 {/* Size Selector */}
                 {isShirt && (<select 
                    className={styles.sizeSelector}
                                        value={selectedSize[id] || ""}
                                        onChange={(e) => handleSizeChange(id, e.target.value)}
                                    >
                                        <option value="">Select Size</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>)}
                 

                                    {/* Quantity Selector */}
                                    <div className={styles.quantitySelector}>
                                        <button 
                                            onClick={() => handleQuantityChange(id, -1)}
                                            className={styles.qtyButton}>
                                               <FaMinusCircle />
 
                                            </button>
                                        <span className={styles.quantitiesSelector}>{quantities[id] || 0}</span>
                                        <button onClick={() => handleQuantityChange(id, 1)}
                                            className={styles.qtyButton}><FaPlusCircle /></button>
                                    </div>                    
                                        
                                    <Button 
                                        className={styles.addButton}
                                        onClick={() => {
                                            if (isShirt && !selectedSize[id]) {
                                                alert("Please select a size before adding to cart.");
                                                return;
                                            }
                                            if (!quantities[id] || quantities[id] < 1) {
                                                alert("Please select at least one item.");
                                                return;
                                            }
                                            addToCart({
                                                id,
                                                size: selectedSize[id],  // Passing selected size
                                                quantity: quantities[id],  // Passing quantity
                                                price, 
                                                src, 
                                                alt,
                                                name 
                                            });
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
            </div>
        </div>
    )
}
