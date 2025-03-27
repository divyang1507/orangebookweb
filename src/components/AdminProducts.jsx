'use client'
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditProductDialog from "./EditProductDialog";
import { useProduct } from "@/app/context/ProductContext";

const AdminProducts = () => {
  const { book } = useProduct();
  return (
    <Table>
      <TableCaption>A list of Products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Derails</TableHead>
          <TableHead>Inventory</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {book?.map((item, id) => {
          return (
            <TableRow key={id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.inventory}</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">
                <EditProductDialog />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AdminProducts;
