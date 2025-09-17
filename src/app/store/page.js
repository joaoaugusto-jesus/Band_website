"use client";
import { useState } from 'react'
import styles from './Store.module.css';
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import PageIcon from "../components/Icons/page";
import { shirts } from '../Data/shirts';
import { albuns } from '../Data/albuns';
import Button from '../components/Button';
import Card from '../components/Card/page';
import { TiTicket } from 'react-icons/ti';
import { useTranslation } from 'react-i18next';



export default function Store() {
    const [searchTerm, setSearchTerm] = useState("");
    const { t, i18n } = useTranslation("store");

    // Function to filter products based on search
    const filteredShirts = shirts.filter((shirt) =>
        shirt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAlbums = albuns.filter((album) =>
        album.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    

    return (
        <>
            <Navbar />
            <div className={styles.layout}>
                <div className={styles.title}>
                    <h1>{t("Store")}</h1>
                   
                    <span>{t("music")} </span>
                    <span>{t("merchandise")}</span>
                    <span>{t("Tickets")}</span>
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
                    <Button className={styles.searchButton}>{t("Search")}</Button>
                </div>

                {/* Shirts Section */}
                <div className={styles.gridShirt}>
                    {filteredShirts.length > 0 ? (
                        filteredShirts.map((shirt) => (
                            <Card 
                                key={shirt.id}
                                src={shirt.src} // Changed from image to src
                                name={shirt.name}
                                price={shirt.price} 
                                id={shirt.id} // Ensure ID is passed for state tracking
                                isShirt={true} 
                            />
                        ))
                    ) : (
                        <p>{t("No shirts available")}</p>
                    )}
                </div> 

                {/* Albums Section */}
                <div className={styles.gridAlbum}>
                    {filteredAlbums.length > 0 ? (
                        filteredAlbums.map((albuns) => (
                            <Card 
                                key={albuns.id}
                                src={albuns.src} // Changed from image to src
                                name={albuns.name}
                                price={albuns.price} 
                                alt={albuns.alt}
                                isShirt={false} 
                               
                            />
                        ))
                    ) : (
                        <p>No album available</p>
                    )}
                </div> 
            </div>
            <PageIcon />
            <Footer />
        </>
    );
}
