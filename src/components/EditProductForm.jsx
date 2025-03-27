// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { useProduct } from "@/app/context/ProductContext";

// const EditProductForm = ({ itemid }) => {
 

//   return (
//     <div className="flex justify-center items-center gap-2">
//       <form onSubmit={handleSubmit} className="space-y-4 mx-auto w-full max-w-md">
//         <div>
//           <Label htmlFor="name">Book Name</Label>
//           <Input id="name" name="name" value={book.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <Label htmlFor="details">Details</Label>
//           <Textarea id="details" name="details" value={book.details} onChange={handleChange} required />
//         </div>
//         <div>
//           <Label htmlFor="price">Price</Label>
//           <Input id="price" name="price" type="number" value={book.price} onChange={handleChange} required />
//         </div>
//         <div>
//           <Label htmlFor="images">Upload 5 Images</Label>
//           <Input id="images" name="images" type="file" accept="image/*" multiple onChange={handleImageChange} />
//         </div>
//         <div className="flex gap-2 mt-2">
//           {book.imagePreviews.map((preview, index) => (
//             <div key={index} className="relative">
//               <img src={preview} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded" />
//               <button
//                 type="button"
//                 onClick={() => removeImage(index)}
//                 className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>
//         <div>
//           <Label htmlFor="inventory">Inventory</Label>
//           <Input id="inventory" name="inventory" type="text" value={book.inventory} onChange={handleChange} required />
//         </div>
//         <div className="flex items-center gap-2">
//           <Label htmlFor="stock">In Stock</Label>
//           <Switch id="stock" checked={book.instock} onCheckedChange={handleStockChange} />
//         </div>
//         <Button type="submit" className="w-full" disabled={loading}>
//           {loading ? "Updating..." : "Update Book"}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default EditProductForm;
