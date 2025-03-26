import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import EditProductDialog from './EditProductDialog'
  

const AdminProducts = () => {
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
      <TableRow>
        <TableCell className="font-medium">INV001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell className="text-right"><EditProductDialog/></TableCell>
      </TableRow>
    </TableBody>
  </Table>
  
  )
}

export default AdminProducts
