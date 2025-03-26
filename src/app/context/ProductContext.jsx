"use client"
import React, { createContext, useContext, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs, doc, setDoc  } from 'firebase/firestore';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [book, setBook] = useState();
  const [uploadProgress, setUploadProgress] = useState(0); // Optional: track upload progress
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  
  
  const getbook = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "books")); // Ensure "books" is your Firestore collection
      const booksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log(booksList);
      setBook(booksList); // Set the fetched books in state
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };
  

  const uploadImage = async (imageFile) => {
    const imageRef = ref(storage, `books/${imageFile.name}-${Date.now()}`);
    await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(imageRef);
  };

  const addBook = async (bookData) => {
    try {
      setLoading(true);
      // Upload images and get their URLs
      const imageUrls = await Promise.all(bookData.images.map(uploadImage));

      const bookRef = await addDoc(collection(db, "books"), {
        name: bookData.name,
        details: bookData.details,
        images: imageUrls, // Uploaded image URLs
        price: bookData.price,
        inventory: bookData.inventory,
        stock: bookData.stock,
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      return { success: true, id: bookRef.id };
    } catch (error) {
      console.error("Error adding book: ", error);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };





  

  return (
    <ProductContext.Provider value={{ book, getbook, addBook, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook
export const useProduct = () => useContext(ProductContext);

export default ProductProvider;
