"use client";
import styles from "./Booking.module.css";
import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react'; // Import useSession
import Navbar from "../components/Navbar/page";
import PageIcon from "../components/Icons/page";
import Footer from "../components/Footer/page";
const GigBookingComponent = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [message, setMessage] = useState("");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession(); // Get the user session

    const userId = session?.user?.id; // Derive userId from session

    useEffect(() => {
        const fetchBookings = async () => {
            if (!userId) return; // Skip if userId is not available

            setLoading(true);
            try {
                const response = await fetch(`/api/booking/get?userId=${userId}`); // Correct URL
                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                setMessage("Error fetching bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [userId]);

    const handleBookingRequest = async () => {
        if (!selectedDate) {
            setMessage("Please select a date.");
            return;
        }

        const bookingData = { userId, date: selectedDate };

        try {
            setLoading(true);
            const response = await fetch("/api/booking/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("Booking request submitted!");
                setBookings((prev) => [...prev, result]); // Optimistic update
                setSelectedDate(""); // Reset input
            } else {
                setMessage(result.error || "Booking request failed. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar />
        <div className={styles.layout}>
            <div className={styles.header}>
            <h1>Request a Band for Your Venue</h1>
            {message && <p>{message}</p>}

                <div>
                    <label>
                        Select Date:
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            disabled={loading}
                        />
                    </label>
                    <button onClick={handleBookingRequest} disabled={loading}>
                        {loading ? "Submitting..." : "Submit Request"}
                    </button>
                   </div>
                </div>
            <div className={styles.content}>

                    <div className={styles.bookings}>
                        <h2>Your Booking Requests</h2>
                        {loading ? <p>Loading...</p> : (
                            <ul>
                                {bookings.map((booking) => (
                                    <li key={booking.id}>
                                        <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                                        <p><strong>Status:</strong> {booking.status}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
            </div>
        </div>
        <PageIcon />
        <Footer />
        </>
    );
};

export default GigBookingComponent;