"use client";
import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import styles from './Store.module.css';
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import PageIcon from "../components/Icons/page";
import { shirts } from '../Data/shirts';
import { albuns } from '../Data/albuns';
import Image from 'next/image';
import Button from '../components/Button';
import { TiTicket } from 'react-icons/ti';

export default function Store() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSize, setSelectedSize] = useState({});
    const [quantities, setQuantities] = useState({});
    const { cart, addToCart } = useCartStore();

    // Function to filter products based on search
    const filteredShirts = shirts.filter((shirt) =>
        shirt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAlbums = albuns.filter((album) =>
        album.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <>
            <Navbar />
            <div className={styles.layout}>
                <div className={styles.title}>
                    <h1>Store</h1>
                    <p>Buy our </p>
                    <p>music </p>
                    <p>merchandise</p>
                    <p>Tickets</p>
                </div>  

                {/* Search Bar */}
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <Button className={styles.searchButton}>Search</Button>
                </div>

                {/* Shirts Section */}
                <div className={styles.gridShirt}>
                    {filteredShirts.length > 0 ? (
                        filteredShirts.map((shirt) => (
                            <div key={shirt.id} className={styles.card}>
                                <Image src={shirt.src} alt={shirt.name} width={100} height={100} className={styles.photo} />
                                <div className={styles.overlay}>
                                    <h2 className={styles.name}>{shirt.name}</h2>
                                    <p className={styles.price}>${shirt.price}</p>

                                    {/* Size Selector */}
                                    <select 
                                        className={styles.sizeSelector}
                                        value={selectedSize[shirt.id] || ""}
                                        onChange={(e) => handleSizeChange(shirt.id, e.target.value)}
                                    >
                                        <option value="">Select Size</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>

                                    {/* Quantity Selector */}
                                    <div className={styles.quantitySelector}>
                                        <button onClick={() => handleQuantityChange(shirt.id, -1)}>-</button>
                                        <span>{quantities[shirt.id] || 0}</span>
                                        <button onClick={() => handleQuantityChange(shirt.id, 1)}>+</button>
                                    </div>

                                    <Button 
                                        className={styles.addButton}
                                        onClick={() => addToCart({
                                            ...shirt,
                                            size: selectedSize[shirt.id] || "M",
                                            quantity: quantities[shirt.id] || 1
                                        })}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h2 className={styles.unavailable}>No shirts available</h2>
                    )}
                </div>

                {/* Albums Section */}
                <div className={styles.gridAlbum}>
                    {filteredAlbums.length > 0 ? (
                        filteredAlbums.map((album) => (
                            <div key={album.id} className={styles.card}>
                                <Image src={album.src} alt={album.name} width={100} height={100} className={styles.photo} />
                                <div className={styles.overlay}>
                                    <h2 className={styles.name}>{album.name}</h2>
                                    <p className={styles.price}>${album.price}</p>

                                    <div className={styles.quantitySelector}>
                                        <button onClick={() => handleQuantityChange(album.id, -1)}>-</button>
                                        <span>{quantities[album.id] || 0}</span>
                                        <button onClick={() => handleQuantityChange(album.id, 1)}>+</button>
                                    </div>
                                    <Button 
                                        className={styles.addButton}
                                        onClick={() => addToCart({...album, quantity: 1})}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h2 className={styles.unavailable}>No albums available</h2>
                    )}
                </div>
            </div>
            <PageIcon />
            <Footer />
        </>
    );
}
