import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/superbaseclient";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Mobile Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { identifier, password } = credentials;
        const isEmail = identifier.includes("@");

        const { data: users, error } = await supabase
          .from("users")
          .select("*")
          .eq(isEmail ? "email" : "mobile", identifier);

        if (error) throw new Error("Database query failed");

        const user = users?.[0];

        if (user && await bcrypt.compare(password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            address: user.address,
            role: user.role, // Default role if not set
          };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.mobile = user.mobile;
        token.address = user.address;
        token.role = user.role; // Default role if not set
      }

      if (trigger === "update" && session) {
        token.name = session.name;
        token.mobile = session.mobile;
        token.address = session.address;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        mobile: token.mobile,
        address: token.address,
        role: token.role, // Default role if not set
      };
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
});

export { handler as GET, handler as POST };
