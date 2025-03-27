import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EditProductForm from './EditProductForm'
import { Button } from './ui/button'
import AddProductForm from './AddProductForm'
  

const AddProduct = () => {
  return (
   <div className='flex flex-col items-end justify-end p-2'>
     <Dialog>
    <DialogTrigger className="px-4 py-2 bg-orange-200 hover:outline-2 outline-orange-600 hover:bg-orange-400 rounded-lg">Create New Product ?</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Want to Create New Product ?</DialogTitle>
        <DialogDescription>
        </DialogDescription>
      </DialogHeader>
         <AddProductForm/>
    </DialogContent>
  </Dialog>
   </div>
  )
}

export default AddProduct
