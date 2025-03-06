import { PrismaClient } from "@prisma/client";


export async function PUT(req, { params }) {
    const { id } = params; // Booking ID from the URL
    const { status } = await req.json(); // New status ("confirmed" or "rejected")

    try {
        const bookingId = parseInt(id, 10);
        if (isNaN(bookingId)) {
            return new Response(JSON.stringify({ error: "Invalid booking ID" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (!status || !["confirmed", "rejected"].includes(status)) {
            return new Response(JSON.stringify({ error: "Invalid status" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const existingBooking = await prisma.booking.findUnique({ where: { id: bookingId } });
        if (!existingBooking) {
            return new Response(JSON.stringify({ error: "Booking not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status },
        });

        return new Response(JSON.stringify({ message: "Booking status updated", booking: updatedBooking }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating booking:", error);
        return new Response(JSON.stringify({ error: "Failed to update booking", details: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
