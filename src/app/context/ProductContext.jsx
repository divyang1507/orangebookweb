// import React, { createContext, useContext, useState } from 'react';
// import { db } from '@/firebase';
// import { collection, getDocs, doc, setDoc, addDoc  } from 'firebase/firestore';
// import { getDownloadURL, uploadBytes } from 'firebase/storage';
// import { supabase } from '@/lib/superbaseclient';
// const ProductContext = createContext();
// const ProductProvider = ({ children }) => {
//   const [book, setBook] = useState();
//   const [uploadProgress, setUploadProgress] = useState(0); // Optional: track upload progress
//   // const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

  

// const  getBook = async ()=> {
//   const { data, error } = await supabase
//     .from('books')  // Replace 'books' with your table name
//     .select('*');

//   if (error) console.error(error);
//   return data;
// }
//   // const getbook = async () => {
//   //   try {
//   //     const querySnapshot = await getDocs(collection(db, "books")); // Ensure "books" is your Firestore collection
//   //     const booksList = querySnapshot.docs.map(doc => ({
//   //       id: doc.id,
//   //       ...doc.data()
//   //     }));
      
//   //     console.log(booksList);
//   //     setBook(booksList); // Set the fetched books in state
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //     setError(error.message);
//   //   }
//   // };
  

//   // const uploadImage = async (imageFile) => {
//   //   const imageRef = ref(storage, `books/${imageFile.name}-${Date.now()}`);
//   //   await uploadBytes(imageRef, imageFile);
//   //   return await getDownloadURL(imageRef);
//   // };

//   // const addBook = async (bookData) => {
//   //   try {
//   //     setLoading(true);
//   //     // Upload images and get their URLs
//   //     const imageUrls = await Promise.all(bookData.images.map(uploadImage));

//   //     const bookRef = await addDoc(collection(db, "books"), {
//   //       name: bookData.name,
//   //       details: bookData.details,
//   //       images: imageUrls, // Uploaded image URLs
//   //       price: bookData.price,
//   //       inventory: bookData.inventory,
//   //       stock: bookData.stock,
//   //       createdAt: serverTimestamp(),
//   //     });

//   //     setLoading(false);
//   //     return { success: true, id: bookRef.id };
//   //   } catch (error) {
//   //     console.error("Error adding book: ", error);
//   //     setLoading(false);
//   //     return { success: false, error: error.message };
//   //   }
//   // };





  

//   return (
//     <ProductContext.Provider value={{ getBook, book, error, loading }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// // Custom Hook
// export const useProduct = () => useContext(ProductContext);

// export default ProductProvider;
"use client";  // 👈 Required for React Context in Next.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/superbaseclient';
import { boolean } from 'zod';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [book, setBook] = useState([]);
  const [error, setError] = useState(null);  // ✅ Ensure `error` is declared
  const [loading, setLoading] = useState(false);

  const getBook = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching

    const { data, error } = await supabase.from('books').select('*');

    if (error) {
      console.error("Supabase Error:", error);
      setError(error.message);  // ✅ Store error in state
    } else {
      console.log("Fetched Data:", data);
      setBook(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getBook();
  }, [])


  const addBook = async ({name, details, price, inventory, instock, images}) => {
    const supabaseUrl = "https://zvovqfrbiuoqnnvoznah.supabase.co";
    if (images.length !== 5) {
      console.error("You must upload exactly 5 images.");
      return;
    }
  
    const uploadedImageUrls = [];
  
    // Loop through each image and upload to Supabase Storage
    for (const image of images) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 5)}.${fileExt}`;
      const filePath = `books/${fileName}`; // Folder structure in Supabase Storage
  
      // Upload image
      const { data, error } = await supabase.storage.from("book-images").upload(filePath, image);
  
      if (error) {
        console.error("Error uploading image:", error);
        return;
      }
  
      // Get the public URL of the uploaded image
      const { data: urlData } = supabase.storage.from("book-images").getPublicUrl(filePath);
      uploadedImageUrls.push(urlData.publicUrl);
    }


    const { data, error } = await supabase
      .from('books')  // Ensure the table name matches exactly
      .insert([
        {

          name : name, // Replace with your book properties e.g. name
          details : details,
          price : price,
          inventory : inventory,
          instock : instock,
          images: uploadedImageUrls, 
        }
      ]);
  
    if (error) {
      console.error("Error adding book:", error);
    } else {
      console.log("Book added successfully:", data);
    }
  };

  return (
    <ProductContext.Provider value={{ getBook, book,addBook, error, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook
export const useProduct = () => useContext(ProductContext);

export default ProductProvider;
