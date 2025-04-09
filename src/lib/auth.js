import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/superbaseclient";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Fetch user from Supabase
        const { data: users, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (error || !users) {
          throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(password, users.password);
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: users.id,
          email: users.email,
          name: users.name,
          username: users.username,
          mobile_number: users.mobile_number,
          address: users.address,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
        token.mobile_number = user.mobile_number;
        token.address = user.address;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.mobile_number = token.mobile_number;
      session.user.address = token.address;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
