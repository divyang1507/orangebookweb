"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useProduct } from "@/app/context/ProductContext";
import { boolean } from "zod";
import { Switch } from "./ui/switch";
// import { useToast } from "@/components/ui/use-toast";


const EditProductForm = () => {
    const {addBook, loading} = useProduct();
    const [book, setBook] = useState({
        name: "",
        details: "",
        // images: [],
        price: "",
        inventory: "",
        instock: true,
        images: [], // Stores image files
        imagePreviews: [], // Stores image preview URLs
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
    const files = Array.from(e.target.files); // Convert FileList to array
  
    if (files.length !== 5) {
      alert("Please select exactly 5 images.");
      return;
    }
  
    const imagePreviews = files.map((file) => URL.createObjectURL(file)); // Generate previews
  
    setBook((prevBook) => ({
      ...prevBook,
      images: files, 
      imagePreviews, 
    }));
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (book.images.length !== 5) {
      alert("Please upload exactly 5 images.");
      return;
    }

    const response = await addBook(book);
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
          <Label htmlFor="images">Upload 5 Images</Label>
          <Input id="images" name="images" type="file" accept="image/*" multiple onChange={handleImageChange} />
        </div>
        <div className="flex gap-2">
         <div className="flex gap-2 mt-2">
         <div className="flex gap-2 mt-2">
         {book.imagePreviews.map((preview, index) => (
    <img key={index} src={preview} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded" />
  ))}
</div>
</div>
        </div>
        <div>
          <Label htmlFor="inventory">Inventory</Label>
          <Input id="inventory" name="inventory" type="text" value={book.inventory} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Switch onCheckedChange={handleStockChange} value={book.instock}/>
          {/* <Input id="stock" name="stock" type="bool" value={book.stock} onChange={handleChange} required /> */}
        </div>
        <Button type="submit" className="w-full">Add Book</Button>
      </form>
      <div className="absolute bg-white -right-100">
      {/* {book.imagePreview && <img src={book.imagePreview} alt="Preview" className="mt-2 w-full h-40 object-cover rounded" />} */}
      </div>
      </div>
   
  )
}

export default EditProductForm;
