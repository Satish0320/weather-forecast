import prisma from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export  const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials:{
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials){
            const user = await prisma.user.findUnique({
                where:{
                    email: credentials?.email
                },
            })
            if (user && user.password === credentials?.password) {
                return user
            }
            return null;
        }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  }
};

const handler =  NextAuth(authOptions);
export {handler as GET, handler as POST, handler as PUT}