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
  
const EditProductDialog = () => {
  return (
        <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
      </DialogDescription>
    </DialogHeader>
       <EditProductForm/>
  </DialogContent>
</Dialog>
  )
}

export default EditProductDialog
