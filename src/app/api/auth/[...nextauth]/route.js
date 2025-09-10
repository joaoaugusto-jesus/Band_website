import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// caminho relativo a partir de src/app/api/auth/[...nextauth]/route.js
import { prisma } from "@/lib/prismaClient";

import bcrypt from "bcryptjs";

export const authOptions = {
  // Mantém JWT para evitar que o /api/auth/session dependa do adapter para buscar no DB
  session: { strategy: "jwt" },

  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;

        // Retorne só o essencial; NextAuth colocará isso no token
        return { id: user.id, email: user.email, name: user.name || null };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) session.user.id = token.id;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  // debug: true, // habilite se quiser logs detalhados
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
