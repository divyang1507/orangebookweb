'use client'
import HeroSlider from "@/components/HeroSlider";
import Image from "next/image";
import { useProduct } from "./context/ProductContext";
import { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import BookSection from "@/components/BookSection";

export default function Home() {

  
  return (
    <>
  <div className="bg-gray-300 md:bg-blue-200 lg:bg-green-200 outline-1 outline-amber-950 p-2">
  <HeroSlider/>
  </div>
  <div className="bg-gray-300 md:bg-blue-200 lg:bg-green-200 outline-1 outline-amber-950 p-2">
  <div className="flex flex-col items-center justify-center gap-4 p-4">
   <BookSection/>
    </div>
  </div>

    </>
  );
}
