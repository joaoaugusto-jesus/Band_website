"use client";
import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import styles from './Card.module.css'
import Button from '../Button'
import Image from 'next/image'
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Card({ src, name, price, className, id, isShirt, alt }) {
  
  const [selectedSize, setSelectedSize] = useState({});
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCartStore();
  const { t } = useTranslation("card");  

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

const calculateTotalPrice = (id) => {
    const quantity = quantities[id] || 0;
    return (quantity * price).toFixed(2); // Ensure the price is formatted to 2 decimal places
  };

    return (
        <div className={`${styles.card} ${className}`}>
            <div className={styles.imageContainer}>
                <Image priority  src={src} alt={name} width={300} height={300} className={styles.photo}  />
            </div>
            
            <div className={styles.overlay}>
                <h2 className={styles.name}>{name}</h2>
                <div className={styles.priceQtyBox}>
                <p className={styles.price}>${calculateTotalPrice(id)}</p> 
                {/* Quantity Selector */} </div>
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
                                   
                 {/* Size Selector */}
                 {isShirt && (<select 
                    className={styles.sizeSelector}
                                        value={selectedSize[id] || ""}
                                        onChange={(e) => handleSizeChange(id, e.target.value)}
                                    >
                                        <option value="">{t("select_size")}</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>)}
                 

                                                     
                                        
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
                                      {t("Add to cart")}
                                    </Button>
            </div>
        </div>
    )
}
