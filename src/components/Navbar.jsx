"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import UserButton from "./UserButton";
import Image from "next/image";
// import {logo} from "../public/LogoImage.webp"; // Adjust the path as necessary
const Navbar = () => {
  const router = useRouter();
  const data = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const { data: session } = useSession(); // Get session data



  return (
    <nav className="w-full p-4 bg-gray-300 md:bg-blue-200 lg:bg-green-200 outline-1 outline-amber-950 flex justify-between items-center">
      <div>
        <Link href={"/"}><div className="flex items-center gap-2">
          <Image src={'/LogoImage.webp'} alt='logo' width={64} height={64}/>
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold ">Orange Book </h1>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold ">Publication</h1>
          </div>
          </div></Link>
      </div>
      <div>
        <ul className="space-x-12">
          {data.map((item, id) => {
            return (
              <li
                key={id}
                className="inline-block hover:text-orange-500 text-lg">
                <Link href={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-4 ">
        {session ? (
          <div>
          <UserButton name={session.user.name}/>
         
          </div>
        ) : (
          <>
          <Button   onClick={() => router.push("/login")} className="bg-orange-500 hover:bg-orange-700 text-white">
          Login
          </Button>
          <Button variant='outline' onClick={() => router.push("/signup")} className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
          Signup
          </Button>
          

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

