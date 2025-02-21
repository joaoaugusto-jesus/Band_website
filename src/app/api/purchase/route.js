import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userId, items, totalPrice } = await req.json();

        console.log("Received purchase data:", { userId, items, totalPrice }); // Log the data

        // Validate the request data
        if (!userId || !items || !totalPrice) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
            });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return new Response(JSON.stringify({ error: "Invalid items data" }), {
                status: 400,
            });
        }

        // Save the order to the database
        const order = await prisma.order.create({
            data: {
                userId,
                totalPrice,
                items: {
                    create: items.map((item) => ({
                        productId: item.id,
                        name: item.name,       // Add this field
                        type: item.type,       // Add this field
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
        });

        console.log("Order created:", order); // Log the created order

        return new Response(JSON.stringify({ message: "Purchase successful", order }), {
            status: 201,
        });
    } catch (error) {
        console.error("Purchase error:", error);
        return new Response(JSON.stringify({ error: "Purchase failed", details: error.message }), {
            status: 500,
        });
    }
}