"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useProduct } from "@/app/context/ProductContext";

const AddProductForm = () => {
  const { addBook, loading } = useProduct();
  const [book, setBook] = useState({
    name: "",
    details: "",
    price: "",
    inventory: "",
    instock: true,
    images: [],
    imagePreviews: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleStockChange = (checked) => {
    setBook((prev) => ({ ...prev, instock: checked }));
  };

  // Handle multiple image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
  
    // Convert new images to URLs
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
  
    setBook((prevBook) => ({
      ...prevBook,
      images: [...prevBook.images, ...files], // Append new images
      imagePreviews: [...prevBook.imagePreviews, ...newImagePreviews], // Append new previews
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addBook(book);
    console.log(book);
  };

  const removeImage = (index) => {
    setBook((prevBook) => {
      const updatedImages = [...prevBook.images];
      const updatedPreviews = [...prevBook.imagePreviews];
  
      updatedImages.splice(index, 1);
      updatedPreviews.splice(index, 1);
  
      return { ...prevBook, images: updatedImages, imagePreviews: updatedPreviews };
    });
  };



  return (
    <div>
          <div className="flex justify-center items-center gap-2">
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto w-full max-w-md">
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
          <Label htmlFor="images">Upload 5 Images</Label>
          <Input id="images" name="images" type="file" accept="image/*" multiple onChange={handleImageChange} />
        </div>
        <div className="flex gap-2 mt-2">
        {book.imagePreviews.map((preview, index) => (
    <div key={index} className="relative">
      <img src={preview} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded" />
      <button
        type="button"
        onClick={() => removeImage(index)}
        className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
      >
        ✕
      </button>
    </div>
  ))}
        </div>
        <div>
          <Label htmlFor="inventory">Inventory</Label>
          <Input id="inventory" name="inventory" type="text" value={book.inventory} onChange={handleChange} required />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="stock">In Stock</Label>
          <Switch id="stock" checked={book.instock} onCheckedChange={handleStockChange} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </div>
      
    </div>
  )
}

export default AddProductForm
