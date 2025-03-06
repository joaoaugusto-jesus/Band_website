import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const gigs = await prisma.gig.findMany();
        return new Response(JSON.stringify(gigs), { status: 200 });
    } catch (error) {
        console.error("Error fetching gigs:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch gigs" }), {
            status: 500,
        });
    }
}