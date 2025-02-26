"use client";

import { musicians } from "../Data/musicians";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import LayoutBg from "../components/LayoutBg/page";
import PageIcon from "../components/Icons/page";
import styles from "./AboutUs.module.css";
import LayoutTb from "../components/LayoutTb/page";
import { useState } from "react";
import Modal from "../components/Modal/page"; // Import the Modal component

export default function AboutUs() {

   
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedMusician, setSelectedMusician] = useState(null);

    // Handle opening the modal
    const handleOpenModal = (musician) => {
        setSelectedMusician(musician);
        setIsModalOpen(true);
      };
    
      // Handle closing the modal
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMusician(null);
      };
        


      return (
        <>
          <Navbar />
          <div className={styles.layout}>
           
             
              <div className={styles.container}>
            <div className={styles.title}>
              <h2>Musicians</h2>

             </div> 
                <ul className={styles.list}>
                  {musicians.map((musician) => (
                    <li
                      key={musician.id}
                      className={styles.items}
                      onClick={() => handleOpenModal(musician)}
                    >
                      <span className={styles.names}>{musician.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            
         
        
    
          {/* Render the Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            musician={selectedMusician}
          /> </div>
           <PageIcon />
          <Footer />
          </> 
      );
    }