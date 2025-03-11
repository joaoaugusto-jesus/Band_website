// src/app/api/booking/post/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        // Parse the request body
        const body = await request.json();
        const { userId, date } = body;

        // Validate the request body
        if (!userId || !date) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
            });
        } else {
            if (!userId) {
                return new Response(JSON.stringify({ error: "Missing userId" }), {
                    status: 400,
                });
            } else if (!date) {
                return new Response(JSON.stringify({ error: "Missing date" }), {
                    status: 400,
                });
            }
        }

        // Create the booking
        const booking = await prisma.booking.create({
            data: {
                userId,
                date: new Date(date), // Ensure the date is parsed correctly
                status: "pending", // Default status
            },
        });

        // Return the created booking
        return new Response(JSON.stringify(booking), { status: 201 });
    } catch (error) {
        // Log the error properly
        console.error("Error creating booking:", error.message || error);
        return new Response(JSON.stringify({ error: "Failed to create booking" }), {
            status: 500,
        });
    }
}