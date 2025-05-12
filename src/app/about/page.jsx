"use client";
import React from "react";
import aboutImage from "../../../public/LetterReadChild.png"
import Image from "next/image";

const page = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-gray-800 dark:text-gray-100 space-y-20">
      
      {/* Our Vision */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="relative w-full aspect-[4/3]">
  <Image
    src={aboutImage}
    alt="Vision"
    fill
    className="rounded-xl shadow-md object-cover"
  />
</div>
        <div>
          <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            At Orange Book Publication, we envision a world where every story finds
            its reader. We aim to redefine self-publishing by making it more accessible,
            transparent, and empowering for aspiring and established authors alike.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            We’re committed to helping authors publish with pride. From editing
            and design to printing and distribution, our team ensures that each book
            meets the highest standards. We stand for creativity, quality, and connection.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img
            src="/mission.webp"
            alt="Mission"
            className="rounded-xl shadow-md w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-orange-600">Why Choose Us</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
          Orange Book Publication offers everything you need to publish professionally
          — with full support and global reach.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {[
            {
              title: "Creative Design",
              desc: "Eye-catching covers and layouts that reflect your story.",
            },
            {
              title: "End-to-End Support",
              desc: "From manuscript to market, we’re with you every step.",
            },
            {
              title: "Global Distribution",
              desc: "Get your book on shelves and platforms worldwide.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-orange-100 dark:border-orange-800 text-left"
            >
              <h3 className="text-xl font-semibold text-orange-500 mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
