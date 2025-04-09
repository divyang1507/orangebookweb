"use client";

import { supabase } from "@/lib/superbaseclient";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({}); // ✅ Changed from array to null
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Optimized getBook using useCallback
  const getBook = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error before fetching

    const { data, error } = await supabase.from("books").select("*");

    if (error) {
      console.error("Supabase Error:", error);
      setError(error.message);
    } else {
      setBooks(data);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getBook();
  }, [getBook]);

  // ✅ Enhanced addBook function with better image handling
  const addBook = async ({ name, details, price, inventory, instock, images }) => {
    try {
      let imageUrls = [];

      if (images && images.length > 0) {
        for (const imageFile of images) {
          const fileExt = imageFile.name.split(".").pop();
          const fileBaseName = imageFile.name.replace(`.${fileExt}`, "").replace(/\s+/g, "-");
          const fileName = `${fileBaseName}-${Date.now()}.${fileExt}`;

          const { data, error } = await supabase.storage
            .from("cover-image") // Bucket name
            .upload(fileName, imageFile);

          if (error) throw error;

          imageUrls.push(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cover-image/${fileName}`);
        }
      }

      const { data, error } = await supabase.from("books").insert([
        {
          name,
          details,
          price,
          inventory,
          instock,
          coverimage: imageUrls, // Store multiple images as an array
        },
      ]);

      if (error) throw error;

      console.log("Book added successfully:", data);
      getBook(); // ✅ Refresh books after adding
      return data;
    } catch (error) {
      console.error("Error adding book:", error.message);
      setError(error.message);
    }
  };

  // ✅ Improved fetchbook function with better error handling
  const fetchbook = async (id) => {
    setBook(null); // Reset previous state
    setError(null);

    const { data, error } = await supabase.from("books").select("*").eq("id", id).single();

    if (error) {
      console.error("Error fetching book:", error);
      setError(error.message);
    } else {
      setBook(data);
    }
  };

  const updatedBook = async (id, updatedData, newImages) => {
    try {
      let updatedImages = Array.isArray(updatedData.coverimage) ? [...updatedData.coverimage] : [];
  
      if (newImages.length > 0) {
        const uploadedImages = await Promise.all(
          newImages.map(async (image) => {
            const fileExt = image.name.split(".").pop();
            const fileBaseName = image.name.replace(`.${fileExt}`, "").replace(/\s+/g, "-");
            const fileName = `${fileBaseName}-${Date.now()}.${fileExt}`;
  
            const { data, error } = await supabase.storage
              .from("cover-image")
              .upload(fileName, image);
  
            if (error) throw error;
            return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cover-image/${fileName}`;
          })
        );
        updatedImages = [...updatedImages, ...uploadedImages]; // ✅ Append new images
      }
  
      const { data, error } = await supabase
        .from("books")
        .update({ ...updatedData, coverimage: updatedImages }) // ✅ Corrected update
        .eq("id", id);
  
      if (error) throw error;
  
      fetchbook(id); // ✅ Refresh book data
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  
  const removeImage = async (id, imageUrl) => {
    try {
      // Fetch the existing product data
      const { data, error } = await supabase
        .from("books")
        .select("coverimage")
        .eq("id", id)
        .single(); // Get a single product
  
      if (error) throw error;
      if (!data || !Array.isArray(data.coverimage)) {
        console.error("No images found or invalid format.");
        return;
      }
  
      // Filter out the removed image
      const updatedImages = data.coverimage.filter((img) => img !== imageUrl);
  
      // Update the database
      const { error: updateError } = await supabase
        .from("books")
        .update({ coverimage: updatedImages })
        .eq("id", id);
  
      if (updateError) throw updateError;
  
      console.log("Image removed successfully!");
    } catch (err) {
      console.error("Error removing image:", err);
    }
  };
   const deletePost = async (id) => {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);
  
    if (error) {
      console.error('Delete error:', error);
      return false;
    }
  
    return true;
  };
  return (
    <ProductContext.Provider value={{ getBook, books, addBook, editBookdata, fetchbook, book, error, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

// ✅ Custom Hook for easy access
export const useProduct = () => useContext(ProductContext);

export default ProductProvider;
