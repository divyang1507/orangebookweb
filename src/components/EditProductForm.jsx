"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useProduct } from "@/app/context/ProductContext";
// import { useToast } from "@/components/ui/use-toast";


const EditProductForm = () => {
    const {addBook, loading} = useProduct();
    const [book, setBook] = useState({
        name: "",
        details: "",
        images: [],
        price: "",
        inventory: "",
        stock: "",
        imagePreview: null,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setBook({ ...book, image: file, imagePreview: URL.createObjectURL(file) });
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addBook(book);
        // toast({ title: "Book added successfully!", description: book.name });
        console.log(book);
      };
    

  return (
    <div className="flex justify-center items-center gap-2 relative">
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto ">
        <div>
          <Label htmlFor="name">Book Name</Label>
          <Input id="name" name="name" value={book.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="details">Details</Label>
          <Textarea id="details" name="details" value={book.details} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" value={book.price} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="image">Upload Image</Label>
          <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} required />
         
        </div>
        <div>
          <Label htmlFor="inventory">Inventory</Label>
          <Input id="inventory" name="inventory" type="text" value={book.inventory} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" name="stock" type="number" value={book.stock} onChange={handleChange} required />
        </div>
        <Button type="submit" className="w-full">Add Book</Button>
      </form>
      <div className="absolute bg-white -right-100">
      {/* {book.imagePreview && <img src={book.imagePreview} alt="Preview" className="mt-2 w-full h-40 object-cover rounded" />} */}
      </div>
      </div>
   
  )
}

export default EditProductForm
