"use client"; // Ensure this is a Client Component

import { SessionProvider as NextAuthProvider } from "next-auth/react";

const SessionProvider = ({ children }) => {
  return <NextAuthProvider>{children}</NextAuthProvider>;
};

export default SessionProvider;
