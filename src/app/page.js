'use client'
import HeroSlider from "@/components/HeroSlider";
import Image from "next/image";
import { useProduct } from "./context/ProductContext";
import { useEffect } from "react";

export default function Home() {
  const {book} = useProduct();

  
  console.log(book);
  // console.log(error);
  return (
    <>
    <HeroSlider/>

    </>
  );
}
