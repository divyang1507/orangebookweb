'use client'
import { useProduct } from '@/app/context/ProductContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const { fetchbook, editBookdata, book } = useProduct();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    details: '',
    price: '',
    coverimage: [], // New image files
    existingImages: [], // Old image URLs
    inventory: '',
    instock: false,
  });

  const [previewImages, setPreviewImages] = useState([]);

  // Fetch book on mount
  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchbook(id);
    }
  }, [id]);

  // Set local formData once book data is available
  useEffect(() => {
    if (book && Object.keys(book).length > 0) {
      setFormData({
        name: book.name || '',
        details: book.details || '',
        price: book.price || '',
        coverimage: [], // Clear new uploads
        existingImages: book.coverimage || [],
        inventory: book.inventory || '',
        instock: book.instock || false,
      });

      // Show existing images as previews
      setPreviewImages(book.coverimage || []);
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
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      coverimage: [...prev.coverimage, ...files],
    }));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const isOldImage = index < formData.existingImages.length;

    setPreviewImages((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });

    setFormData((prev) => {
      if (isOldImage) {
        const updatedExisting = [...prev.existingImages];
        updatedExisting.splice(index, 1);
        return { ...prev, existingImages: updatedExisting };
      } else {
        const newIndex = index - prev.existingImages.length;
        const updatedNew = [...prev.coverimage];
        updatedNew.splice(newIndex, 1);
        return { ...prev, coverimage: updatedNew };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        coverimage: [...formData.existingImages, ...formData.coverimage],
      };

      await editBookdata(id, payload);
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (!book || Object.keys(book).length === 0) {
    return <p>Loading book data...</p>;
  }

  return (
    <div className="flex justify-center items-center gap-2 py-10">
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
          <Label htmlFor="images">Upload Images</Label>
          <Input id="images" name="images" type="file" accept="image/*" multiple onChange={handleImageChange} />
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          {formData.existingImages.map((img, index) => (
            <div key={index} className="relative">
              <img src={img} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded" />
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
        {/* Image Preview Grid */}
        <div className="flex gap-2 flex-wrap mt-2">
          {previewImages.map((img, index) => (
            <div key={index} className="relative">
              <img src={img} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded" />
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
          <Switch id="stock" checked={formData.instock} onCheckedChange={handleStockChange} />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Updating...' : 'Update Book'}
        </Button>
      </form>
    </div>
  );
};

export default Page;
