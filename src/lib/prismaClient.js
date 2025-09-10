// prismaClient.js
import { PrismaClient } from "@prisma/client";

// Avoid multiple instances in dev (hot-reload)
const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["query", "error", "warn"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

