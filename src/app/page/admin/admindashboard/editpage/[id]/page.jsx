"use client";
import { useProduct } from "@/app/context/ProductContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Page = () => {
  const { fetchbook, removeImage, updatedBook, book } = useProduct();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    price: "",
    coverimage: [],
    inventory: "",
    instock: false,
  });
  const [newImages, setNewImages] = useState([]);
  useEffect(() => {
    if (id) {
      fetchbook(id);
    }
  }, [id]);

  // Sync `book` with local state when it's fetched
  useEffect(() => {
    if (book) {
      setFormData({
        name: book.name || "",
        details: book.details || "",
        price: book.price || "",
        coverimage: book.coverimage || [],
        inventory: book.inventory || "",
        instock: book.instock || false,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStockChange = (checked) => {
    setFormData((prev) => ({ ...prev, instock: checked }));
  };

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]); // ✅ Append new images, don't overwrite
  };

  // ✅ Remove an existing image
//   const handleRemoveImage = async (imageUrl) => {
//     await removeImage(id, imageUrl);
//     setFormData((prev) => ({
//       ...prev,
//       coverimage: prev.coverimage.filter((img) => img !== imageUrl),
//     }));
//   };

const handleRemoveImage = async (imageUrl) => {
  await removeImage(id, imageUrl);

  setFormData((prev) => ({
    ...prev,
    coverimage: Array.isArray(prev.coverimage)
      ? prev.coverimage.filter((img) => img !== imageUrl)
      : [], // Ensure it's always an array
  }));
};



  // ✅ Remove newly selected images before submission
  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const updatedData = {
            ...formData,
            coverimage: [...formData.coverimage], // Keep old images
          };
      console.log("Updating book:", formData);
      await updatedBook(id, updatedData, newImages);
      setNewImages([])
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!book || Object.keys(book).length === 0) {
    return <div className="h-screen w-screen flex items-center justify-center"><BarLoader /></div>;
  }

  return (
    <div>
      {loading ? (
        <div className="h-screen w-screen flex items-center justify-center"><BarLoader /></div>
      ) : (
        <div className="flex justify-center items-center gap-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mx-auto w-full max-w-md">
            <div>
              <Label htmlFor="name">Book Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="details">Details</Label>
              <Input
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="images">Upload 5 Images</Label>
              <Input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <div>
          <label className="block">Current Images</label>
          <div className="grid grid-cols-3 gap-2">
            {formData.coverimage.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} className="w-20 h-20 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
            <div>
              <label className="block">New Image Preview</label>
              <div className="grid grid-cols-3 gap-2">
                {newImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="New preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs rounded">
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="inventory">Inventory</Label>
              <Input
                id="inventory"
                name="inventory"
                type="text"
                value={formData.inventory}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="stock">In Stock</Label>
              <Switch
                id="stock"
                checked={formData.instock}
                onCheckedChange={handleStockChange}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Book"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Page;
