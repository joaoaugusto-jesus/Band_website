"use client";

import { useState } from "react";
import LayoutBg from "../components/LayoutBg/page";
import styles from "./ContactUs.module.css";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import Button from "../components/Button"; 
import PageIcon from "../components/Icons/page";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: process.env.NEXT_PUBLIC_ACCESS_KEY,
                ...formData,
            }),
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
        }
    }

  return (
    <>
    <Navbar />
    <LayoutBg />
      <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formName}>Name</label>
              <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              className={styles.formNameInput} required placeholder="Your name" />
          
              <label htmlFor="email" className={styles.formEmail}>Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleChange}
                className={styles.formEmailInput} required placeholder="email@example.com" />
         
              <label htmlFor="message" className={styles.formMessage}>Message</label>
              <textarea 
                name="message"
                value={formData.message} 
                onChange={handleChange}
                className={styles.formMessageInput} required rows="3" placeholder="Enter Message"></textarea>
          </div>
          <Button className={styles.Button} type="submit">Submit</Button>
      </form>
        <PageIcon />
      <Footer />
    </>
  );
}