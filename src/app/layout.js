import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import ProductProvider from "./context/ProductContext";
import SessionProvider from "../components/SessionProvider";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OrageneBookPublication",
  description: "Learn Forever",
    icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Head>
        {/* ✅ Manually include favicon for consistent behavior */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <SessionProvider>
        <ProductProvider>
        <Navbar/>
        {children}

        </ProductProvider>
         </SessionProvider>
          
      </body>
    </html>
  );
}
