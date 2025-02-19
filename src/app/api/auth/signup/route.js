import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate input
    const validation = signupSchema.safeParse({ email, password });
    if (!validation.success) {
      return new Response(JSON.stringify({ error: validation.error.issues[0].message }), {
        status: 400,
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return new Response(JSON.stringify({ message: "User created successfully", user: newUser }), {
      status: 201,
    });
  } catch (error) {
    console.error("Signup error:", error); // Log the error for debugging
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}