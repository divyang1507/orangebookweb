
import React, { createContext, useContext } from 'react'
import { db } from '@/firebase.config';
import { collection, getDocs, addDoc } from "firebase/firestore";

const ProductContext = createContext();


const ProductProvider = ({ children }) => {


const [book, setBook] = useState([]);
const [uploadProgress, setUploadProgress] = useState(0); // Optional: track upload progress
const [error, setError] = useState(null);

const getbook = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "books"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


const addbook =async()=>{


  const addBookWithImage = async (bookData, imageFile) => {
    try {


      // 4. Add the book data to Firestore, including the image URL
      await addDoc(collection(db, 'books'), {
        ...bookData,      // Spread other book data (e.g., title, author)
        createdAt: new Date() // Optionally, add a timestamp
      });

      console.log('Book added successfully with image!');
    } catch (err) {
      console.error('Error adding book with image:', err);
      setError(err.message);
    }
  };

  return { addBookWithImage, uploadProgress, error };
}

return (
  <ProductContext.Provider value={{ book, getbook, setBook,addbook }}>
    {children}
  </ProductContext.Provider>
);

}