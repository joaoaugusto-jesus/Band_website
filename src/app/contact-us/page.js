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
        message: "",
        phone: ""
    });
    const [submissionResult, setSubmissionResult] = useState(null);

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
        setSubmissionResult(result);
        console.log(result);
        if (result.success) {
          console.log('Success', result);
        } else {
          console.log('Error', data);
          
        }
    
        // Reset form fields
        setFormData({
          name: '',
          email: '',
          message: ''
      });
    }

  return (
    <>
    <Navbar />
   <div className={styles.layout}>
      <div className={styles.contactUsContainer}>
              <form onSubmit={handleSubmit} className={styles.contactUsform}>
                 
                      <label htmlFor="name" className={styles.formlabel}>Name</label>
                      <input 
                      type="text" 
                      name="name"
                      maxLength={40} 
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.formNameInput} 
                      required placeholder="Your name" />
                  
                      <label htmlFor="email" className={styles.formlabel}>Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange}
                        className={styles.formEmailInput}
                        maxLength={40} 
                        required placeholder="email@example.com" />
                      <label htmlFor="phone" className={styles.formlabel}>Phone number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone} 
                        onChange={handleChange}
                        className={styles.formPhoneInput}
                        maxLength={40} 
                        required placeholder="+351 999 999 999" />
                      <label htmlFor="message" className={styles.formlabel}>Leave a message</label>
                      <textarea 
                        name="message"
                        value={formData.message} 
                        onChange={handleChange}
                        className={styles.formMessageInput} 
                        required rows="3" placeholder="Enter Message"></textarea>
                
                  <Button className={styles.Button} type="submit">Submit</Button> 
                  {submissionResult && submissionResult.pending && <p className={styles.success}>Submiting</p> }
                  {submissionResult && submissionResult.success && <p className={styles.success}>Sent successfully!</p> }
                  {submissionResult && !submissionResult.success && <p className={styles.error}>Failed to send!</p>}
              </form>
        </div>
     </div>
        <PageIcon />
      <Footer />
    </>
  );
}