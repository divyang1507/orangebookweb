'use client'
import { FaFacebook, FaRegStar, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProduct } from "@/app/context/ProductContext";
import { HashLoader } from "react-spinners";

const Page = () => {
  const { fetchbook, book, loading } = useProduct();
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState();

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchbook(id);
    }
  }, [id]);

  useEffect(() => {
    if (book?.images?.length > 0) {
      setActiveImage(book.images[0]);
    }
  }, [book]);

  return (
    <section className="w-[90%] max-w-7xl mx-auto py-12">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <HashLoader color="#f97316" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left - Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-6 w-full lg:w-1/2">
            <div className="flex lg:flex-col gap-3 justify-center items-center overflow-x-auto lg:overflow-y-auto">
              {book?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  width={70}
                  height={90}
                  alt={`Thumbnail ${index + 1}`}
                  className={`rounded-md cursor-pointer transition-all duration-300 border-2 ${
                    activeImage === image ? "border-orange-500" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </div>

            <div className="flex justify-center items-center w-full">
              <img
                className="rounded-xl max-h-[500px] object-contain"
                src={activeImage}
                alt={book?.name}
              />
            </div>
          </div>

          {/* Right - Details */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <h2 className="text-sm text-gray-500 uppercase tracking-widest">
                Orange Book Publication
              </h2>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
                {book?.name}
              </h1>
            </div>

            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <FaRegStar className="text-yellow-400" />
                <span>{book?.rating ?? "4.5"} / 5</span>
              </div>
              <span className="text-gray-400">|</span>
              <span>{book?.review ?? "100"}+ Reviews</span>
              <div className="flex items-center gap-3 text-xl ml-auto">
                <FaFacebook className="hover:text-blue-600 transition" />
                <FaTwitter className="hover:text-sky-500 transition" />
                <Link href="https://www.youtube.com/@orangebookpublication9051" target="_blank">
                  <FaYoutube className="hover:text-red-600 transition" />
                </Link>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {book?.details}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-orange-600">₹ {book?.price}</span>
              <Link href="/cart">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-all duration-300">
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
