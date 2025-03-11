import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request, context) {
    const { params } = context; // ✅ Correctly access `params`
    const id = params?.id; // Extract `id` safely

    if (!id || isNaN(parseInt(id, 10))) {
        return new Response(JSON.stringify({ error: "Invalid booking ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        await prisma.booking.delete({
            where: { id: parseInt(id, 10) },
        });

        return new Response(JSON.stringify({ message: "Booking deleted successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error deleting booking:", error);
        return new Response(JSON.stringify({ error: "Failed to delete booking" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
