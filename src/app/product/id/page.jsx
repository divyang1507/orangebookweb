'use client'
import { FaFacebook, FaRegStar, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from 'next/image'
import React, { useState } from 'react'
import Link from "next/link";



const page = () => {
    const [activeImage, setActiveImage] = useState()
  const book = {
    name : "Book Title",
    image : ["a,bc.jpg", "def.jpg", "ghi.jpg"],
    rating : 4.5,
    review : 100,
    description : ["Description 1", "Description 2", "Description 3"],
    price : 500,
     }

  return (
  
      <section className="text-gray-600 body-font overflow-hidden w-[90%] mx-auto">
        <div className="container px-5 lg:py-24 py-12 mx-auto">
          <div className="lg:w-4/5 md:w-4/5 mx-auto flex itme-center justify-center lg:flex-row flex-col">
            <div className="flex flex-col-reverse lg:flex-row gap-5">
              <div className="flex lg:flex-col md:flex justify-between items-center">
                {book?.image?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    width={80}
                    height={100}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${
                      activeImage === image
                        ? "active border-2 border-solid border-black"
                        : "opacity-70"
                    } rounded-sm hover:cursor-pointer`}
                    onClick={() => setActiveImage(image)}
                  />
                ))}
              </div>
              <div className="mx-auto flex justify-center items-center">
                <Image
                  className="rounded-lg"
                  src={activeImage}
                  height={439}
                  width={320}
                  alt={book?.name}
                />
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Book
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {book?.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center justify-center">
                  <span className="flex items-center justify-center">
                    <FaRegStar />
                  </span>
                  <span className="text-gray-600 ml-2 flex ">
                    {book?.rating} ({`${book?.review}`} Reviews){" "}
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s text-xl gap-3">
                  <FaFacebook />
                  <FaTwitter />
                  <Link
                    href={"https://www.youtube.com/@orangebookpublication9051"}
                  >
                    <FaYoutube />
                  </Link>
                </span>
              </div>
              <ul className="leading-relaxed space-y-3">
                <li>Features of the book?:</li>
                {book?.description.map((description, index) => (
                  <li key={index}>{description}</li>
                ))}
              </ul>
  
              <div className="flex mt-8 justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs. {book?.price}
                </span>
                <Link href="/cart">
                  <button className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">
                    Add to Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default page
