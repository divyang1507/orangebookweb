'use client'
import HeroSlider from "@/components/HeroSlider";
import Image from "next/image";
import { useProduct } from "./context/ProductContext";
import { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import BookSection from "@/components/BookSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {

  
  return (
    <>
  <div className=" p-2">
  <HeroSlider/>
  </div>
  <div className="">
  <div className="flex flex-col items-center justify-center gap-4 p-4">
   <BookSection/>
    </div>
  <div className="mt-16">
   <AboutSection/>
    </div>
  </div>

    </>
  );
}
