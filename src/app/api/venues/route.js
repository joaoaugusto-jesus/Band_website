import prisma from "../../../lib/prisma";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return new Response(JSON.stringify({ error: "Missing userId" }), {
            status: 400,
        });
    }

    try {
        const bookings = await prisma.booking.findMany({
            where: { userId: parseInt(userId) },
        });

        return new Response(JSON.stringify(bookings), { status: 200 });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), {
            status: 500,
        });
    }
}