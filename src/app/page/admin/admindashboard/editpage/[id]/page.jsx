'use client'
import { useProduct } from '@/app/context/ProductContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { fetchbook, editBookdata, book } = useProduct();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      details: "",
      price: "",
      images: [],
      // imagePreviews: [],
      inventory: "",
      instock: false,
    });

    useEffect(() => {
        if (id) {
            fetchbook(id);
        }
    }, [id]);

    // Sync `book` with local state when it's fetched
    useEffect(() => {
        if (book && Object.keys(book).length > 0) {
            setFormData({
                name: book.name || "",
                details: book.details || "",
                price: book.price || "",
                covreimage:  book.covreimage || [],
                // imagePreviews: book.covreimage || [],
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
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setFormData((prev) => ({
            ...prev,
            covreimage: files,
            // imagePreviews: [...prev.imagePreviews, ...imageUrls],
        }));
    };

    const removeImage = (index) => {
        setFormData((prev) => {
            const newPreviews = [...prev.covreimage];
            newPreviews.splice(index, 1);
            return { ...prev, covreimage: newPreviews };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("Updating book:", formData);
            await editBookdata(id, formData);
            alert("Book updated successfully!");
        } catch (error) {
            console.error("Error updating book:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!book || Object.keys(book).length === 0) {
        return <p>Loading book data...</p>;
    }

    return (
        <div className="flex justify-center items-center gap-2">
            <form onSubmit={handleSubmit} className="space-y-4 mx-auto w-full max-w-md">
                <div>
                    <Label htmlFor="name">Book Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="details">Details</Label>
                    <Input id="details" name="details" value={formData.details} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="images">Upload 5 Images</Label>
                    <Input id="images" name="images" type="file" accept="image/*" multiple onChange={handleImageChange} />
                </div>
                {/* <div className="flex gap-2 mt-2">
                    {formData.imagePreviews.map((preview, index) => (
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
                </div> */}
                <div>
                    <Label htmlFor="inventory">Inventory</Label>
                    <Input id="inventory" name="inventory" type="text" value={formData.inventory} onChange={handleChange} required />
                </div>
                <div className="flex items-center gap-2">
                    <Label htmlFor="stock">In Stock</Label>
                    <Switch id="stock" checked={formData.instock} onCheckedChange={handleStockChange} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Updating..." : "Update Book"}
                </Button>
            </form>
        </div>
    );
};

export default Page;
