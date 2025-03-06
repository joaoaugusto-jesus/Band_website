// src/app/api/booking/get/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        // Extract the userId from the query parameters
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        // Validate the userId
        if (!userId) {
            return new Response(JSON.stringify({ error: "Missing userId" }), {
                status: 400,
            });
        }

        // Fetch bookings for the user
        const bookings = await prisma.booking.findMany({
            where: { userId },
            include: {  user: true }, // Include related data
        });

        // Return the bookings
        return new Response(JSON.stringify(bookings), { status: 200 });
    } catch (error) {
        // Log the error properly
        console.error("Error fetching bookings:", error.message || error);
        return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), {
            status: 500,
        });
    }
}