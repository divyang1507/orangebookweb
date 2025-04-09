import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/superbaseclient";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { data: users } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email);

        const user = users?.[0];

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            address: user.address
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // On initial sign in
        token.name = user.name;
        token.mobile = user.mobile;
        token.address = user.address;
      }
  
      if (trigger === "update" && session) {
        // When calling `update()` in the frontend
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
      };
      return session;
    }},
  pages: {
    signIn: "/login"
  }
});

export { handler as GET, handler as POST };
