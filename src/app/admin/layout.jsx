'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideNav from "@/components/SideNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    } else if (status === 'authenticated') {
      const role = session?.user?.role;
      if (role === 'admin' || role === 'superadmin') {
        setIsAllowed(true);
      } else {
        router.replace('/login'); // or redirect to /unauthorized
      }
    }
  }, [session, status]);

  if (status === 'loading' || (status === 'authenticated' && !isAllowed)) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} flex gap-4`}>
      <SideNav />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
